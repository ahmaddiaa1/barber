import { PrismaService } from '../prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Role, User } from '@prisma/client';
import { UserUpdateDto } from './dto/user-update-dto';
import { AppSuccess } from 'src/utils/AppSuccess';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  private user = {
    id: true,
    firstName: true,
    lastName: true,
    avatar: true,
    phone: true,
    role: true,
    fcmToken: true,
    createdAt: true,
    updatedAt: true,
  } as Prisma.UserSelect;

  private client = {
    id: false,
    referralCode: true,
    points: true,
    ban: true,
    canceledOrders: true,
  } as Prisma.ClientSelect;

  private barberAndCashier = {
    id: false,
    branch: true,
    Slot: true,
    vacations: true,
  } as Prisma.BarberSelect;

  public async findAllClients(page = 1, pageSize = 10, phone?: string) {
    try {
      const users = await this.prisma.user.findMany({
        where: {
          role: Role.USER,
          ...(phone && { phone }),
        },
        select: {
          ...this.user,
          client: { select: this.client },
        },
        skip: (page - 1) * pageSize,
        take: +pageSize,
      });

      return new AppSuccess({ users }, 'Clients fetched successfully', 200);
    } catch (error) {
      console.error('Error fetching clients:', error.message);
      throw error;
    }
  }

  public async findAllUser(page = 1, pageSize = 10, role?: Role) {
    if (role && !Role[role?.toUpperCase()]) {
      throw new NotFoundException('Role not found');
    }

    try {
      const include = role
        ? {
            [role?.toLowerCase()]: {
              select:
                Role[role.toUpperCase()] === 'ADMIN'
                  ? ({ id: true } as Prisma.AdminSelect)
                  : Role[role.toUpperCase()] === 'BARBER' ||
                      Role[role.toUpperCase()] === 'CASHIER'
                    ? this.barberAndCashier
                    : this.client,
            },
          }
        : {
            admin: false,
            barber: { select: this.barberAndCashier },
            cashier: { select: this.barberAndCashier },
          };
      const fetchedUser = await this.prisma.user.findMany({
        where: { role: Role[role?.toUpperCase()] ?? { not: Role.USER } },
        skip: (page - 1) * pageSize,
        take: +pageSize,
        select: { ...this.user, ...include },
      });

      const users = fetchedUser.map(({ barber, cashier, ...user }) => {
        return {
          ...user,
          ...(barber && { barber }),
          ...(cashier && { cashier }),
        };
      });

      return new AppSuccess({ users }, 'Users fetched successfully', 200);
    } catch (error) {
      console.error('Error fetching users:', error.message);
      throw error;
    }
  }

  public async findOneUser(id: string) {
    const user = await this.findOne(id);

    if (!user) throw new NotFoundException('User not found');

    return new AppSuccess(user, 'User fetched successfully', 200);
  }

  public async updateUser(
    id: string,
    userData: UserUpdateDto,
    file?: Express.Multer.File,
  ) {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException('User not found');
    const roleKey = user.role.toLowerCase();
    const { vacations, vacationsToDelete, ...rest } = userData;
    const avatar = file?.path;
    const updateUser = await this.prisma.user.update({
      where: { id },
      data: {
        ...rest,
        ...(avatar && { avatar }),
        ...((vacations || vacationsToDelete) && {
          [roleKey]: {
            update: {
              vacations: {
                ...(vacationsToDelete && {
                  deleteMany: {
                    id: { in: vacationsToDelete },
                  },
                }),
                ...(vacations && {
                  upsert: vacations.map((vacation) => ({
                    where: { id: vacation.id || 'new' },
                    create: {
                      dates: vacation.dates.map((v) => {
                        const dateWithoutTime = v.split('T')[0];
                        return new Date(dateWithoutTime);
                      }),
                      month: new Date(vacation.month),
                    },
                    update: {
                      dates: vacation.dates.map((v) => {
                        const dateWithoutTime = v.split('T')[0];
                        return new Date(dateWithoutTime);
                      }),
                      month: new Date(vacation.month),
                    },
                  })),
                }),
              },
            },
          },
        }),
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        avatar: true,
        phone: true,
        [roleKey]: {
          select: {
            vacations: { select: { dates: true, month: true, id: true } },
          },
        },
      },
    });
    console.log(updateUser);

    return new AppSuccess(updateUser, 'User updated successfully', 200);
  }

  public async CurrentUser(user: User) {
    const userWithRole = await this.prisma.user.findUnique({
      where: { id: user.id },
      select: {
        ...this.user,
        barber: { select: this.barberAndCashier },
        cashier: { select: this.barberAndCashier },
        client: { select: this.client },
      },
    });

    if (!userWithRole) throw new NotFoundException('User not found');

    const { barber, cashier, client, ...rest } = userWithRole;
    const userRole =
      user.role === Role.USER ? 'client' : user.role.toLowerCase();

    return new AppSuccess(
      {
        ...rest,
        ...(userRole !== 'admin' && {
          [userRole]: barber ||
            cashier || {
              ...client,
              ...(userRole === 'client' &&
                client?.ban && {
                  BanMessage:
                    "You can't make any Order please get contact with us",
                }),
            },
        }),
      },
      'User fetched successfully',
      200,
    );
  }

  private async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        ...this.user,
        admin: true,
        barber: { select: this.barberAndCashier },
        cashier: { select: this.barberAndCashier },
        client: { select: this.client },
      },
    });

    const { admin, barber, cashier, client, ...rest } = user;
    const userRole =
      user.role.toUpperCase() === Role.USER
        ? 'client'
        : user.role.toLowerCase();

    if (!user) throw new NotFoundException('User not found');

    return { ...rest, [userRole]: admin || barber || cashier || client };
  }

  async unbanUser(phone: string) {
    const user = await this.prisma.user.findUnique({
      where: { phone },
    });
    if (!user) throw new NotFoundException('User not found');

    const updatedUser = await this.prisma.user.update({
      where: { phone },
      data: {
        client: {
          update: { ban: false, canceledOrders: 0 },
        },
      },
    });
    return new AppSuccess(updatedUser, 'User unbanned successfully', 200);
  }

  public async deleteUser(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) throw new NotFoundException('User not found');
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        deleted: true,
        UserOrders: {
          updateMany: {
            where: { userId },
            data: {
              deleted: true,
            },
          },
        },
      },
    });
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        UserOrders: {
          updateMany: {
            where: {
              AND: [
                { userId },
                {
                  OR: [
                    { booking: 'UPCOMING' },
                    { status: 'IN_PROGRESS' },
                    { status: 'PENDING' },
                  ],
                },
              ],
            },
            data: {
              booking: 'CANCELLED',
              status: 'CANCELLED',
            },
          },
        },
      },
    });

    return new AppSuccess(null, 'User deleted successfully', 200);
  }

  async deleteEmployee(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        BarberOrders: true,
        CashierOrders: true,
      },
    });

    switch (user.role) {
      case Role.BARBER:
        if (user.BarberOrders.length > 0) {
          await this.prisma.order.updateMany({
            where: { barberId: id },
            data: {
              barberId: null,
              barberName: user.firstName + ' ' + user.lastName,
            },
          });
        }
        await this.prisma.barber.delete({
          where: { id },
        });
        await this.prisma.user.delete({
          where: { id },
        });
        break;
      case Role.CASHIER:
        if (user.CashierOrders.length > 0) {
          await this.prisma.order.updateMany({
            where: { cashierId: id },
            data: { cashierId: null },
          });
        }
        await this.prisma.cashier.delete({
          where: { id },
        });
        await this.prisma.user.delete({
          where: { id },
        });
        break;
    }
    return new AppSuccess(null, 'Employee deleted successfully', 200);
  }
}
