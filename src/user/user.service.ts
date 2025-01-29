import { PrismaService } from '../prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';

import { Role, User } from '@prisma/client';
import { SupabaseService } from 'src/supabase/supabase.service';
import { UserUpdateDto } from './dto/user-update-dto';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private supabaseService: SupabaseService,
  ) {}


  public async findAllClients(page: number = 1, pageSize: number = 10, phone?: string) {
    try {
      const clients = await this.prisma.user.findMany({
        where: {
          role: Role.USER,
          phone: phone ? phone : undefined, 
        },
        include: {
          client: true,
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
      });
      return clients;
    } catch (error) {
      console.error('Error fetching clients:', error.message);
      throw error;
    }
  }

  public async findAllUser(page: number = 1, pageSize: number = 10, role?: Role) {
    try {
      const include = role
      ? role === Role.ADMIN
        ? { admin: true }
        : role === Role.BARBER
        ? { barber: true }
        : role === Role.CASHIER
        ? { cashier: true }
        : {}
      : {
        admin: true,
        barber: true,
        cashier: true,
      };

      const users = await this.prisma.user.findMany({
      where: {
        role: role ? role : { not: Role.USER },
      },
      skip: (page - 1) * pageSize, 
      take: pageSize,
      include,
      });

      // -> to avoid returning all roles in one object
      const cleanedUsers = users.map((user) => {
        return Object.fromEntries(
          Object.entries(user).filter(([key, value]) => {
            if (key === 'admin' || key === 'barber' || key === 'cashier') {
              return value !== null;
            }
            return true;
          }),
        );
      });
     
      return cleanedUsers;
    } catch (error) {
      console.error('Error fetching users:', error.message);
      throw error;
    }
  }

  // public async findAllUser(role: string) {
  //   try {
  //     const normalizedRole = role?.toUpperCase();
  //     const include =
  //       normalizedRole === 'ADMIN'
  //         ? { admin: true }
  //         : normalizedRole === 'BARBER'
  //           ? { barber: true }
  //           : normalizedRole === 'CASHIER'
  //             ? { cashier: true }
  //             // : normalizedRole === 'USER'
  //             //   ? { client: true }
  //               : {
  //                   // client: true,
  //                   admin: true,
  //                   barber: true,
  //                   cashier: true,
  //                 };

  //     if (!include) {
  //       throw new Error(`Invalid role provided: ${role}`);
  //     }

  //     const where = role
  //       ? {
  //           role: {
  //             equals: Role[normalizedRole],
  //           },
  //         }
  //       : {};

  //     const users = await this.prisma.user.findMany({
  //       where,
  //       include,
  //     });
  //     const cleanedUsers = users.map((user) => {
  //       return Object.fromEntries(
  //         Object.entries(user).filter(([_, value]) => value !== null),
  //       );
  //     });

  //     return cleanedUsers;
  //   } catch (error) {
  //     console.error('Error fetching users:', error.message);
  //     throw error;
  //   }
  // }

  public async findOneUser(id: string) {
    const userWithRole = await this.prisma.user.findUnique({
      where: { id },
      include: {
        admin: true,
        barber: true,
        cashier: true,
        client: true,
      },
    });
    if (!userWithRole) {
      throw new NotFoundException('User not found');
    }
    const role = userWithRole.role;

    const { admin, barber, cashier, client, ...rest } = userWithRole;

    const user = {
      ...rest,
      [Role[role === 'USER' ? 'client' : role].toLocaleLowerCase()]: {
        ...(admin || barber || cashier || client),
      },
    };

    return user;
  }

  public async updateUser(
    id: string,
    user: UserUpdateDto,
    file: Express.Multer.File,
  ) {
    const userExists = await this.prisma.user.findUnique({
      where: { id },
    });
    let avatarUrl: string;
    if (!userExists) {
      throw new NotFoundException('User not found');
    }
    if (file) {
      console.log('file', file);
      avatarUrl = await this.supabaseService.uploadAvatar(file, id);
    }

    return this.prisma.user.update({
      where: { id },
      data: {
        ...user,
        avatar: avatarUrl ? avatarUrl : undefined,
      },
    });
  }

  public async CurrentUser(data: User) {
    const userWithRole = await this.prisma.user.findUnique({
      where: { id: data.id },
      include: {
        admin: true,
        barber: true,
        cashier: true,
        client: true,
      },
    });

    if (!userWithRole) {
      throw new NotFoundException('User not found');
    }

    const role = data.role;
    const { admin, barber, cashier, client, password, ...rest } = userWithRole;

    const user = {
      ...rest,
      [(Role[role] === 'USER' ? 'client' : role).toLowerCase()]: {
        ...(admin || barber || cashier || client),
      },
    };
    console.log(user);
    return user;
  }
  public async removeUser(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
