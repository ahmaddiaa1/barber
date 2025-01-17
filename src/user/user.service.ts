import { PrismaService } from '../prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';

import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  public async findAllUser(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  public async findOneUser(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  public async updateUser(id: string, user: User): Promise<User> {
    const userExists = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!userExists) {
      throw new NotFoundException('User not found');
    }

    return this.prisma.user.update({
      where: { id },
      data: user,
    });
  }

  public async removeUser(id: string): Promise<User> {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
