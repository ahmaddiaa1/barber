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

  public async findAllUser(role: Role) {
    const include =
      role === 'ADMIN'.toLocaleLowerCase()
        ? { admin: true }
        : role === 'BARBER'.toLocaleLowerCase()
          ? { barber: true }
          : role === 'CASHIER'.toLocaleLowerCase()
            ? { cashier: true }
            : role === 'USER'.toLocaleLowerCase()
              ? { client: true }
              : undefined;

    const where = role
      ? {
          role: {
            equals: Role[role.toUpperCase()], // Ensure `role` is uppercase
          },
        }
      : {};
    return this.prisma.user.findMany({
      where,
      include,
    });
  }

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
      [Role[role === 'USER' ? 'client' : role].toLowerCase()]: {
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
