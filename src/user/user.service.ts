import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  public createUser(user: User) {
    return this.prisma.user.create({
      data: user,
    });
  }

  public findAllUser() {
    return this.prisma.user.findMany();
  }

  public findOneUser(id: string) {
    return this.prisma.user.findUnique({
      where: { id: id },
    });
  }

  public updateUser(id: string, user: User) {
    return this.prisma.user.update({
      where: { id: id },
      data: user,
    });
  }

  public removeUser(id: string) {
    return this.prisma.user.delete({
      where: { id: id },
    });
  }
}
