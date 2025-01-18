import { PrismaService } from '../prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';

import { User } from '@prisma/client';
import { SupabaseService } from 'src/supabase/supabase.service';
import { UserUpdateDto } from './dto/user-update-dto';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private supabaseService: SupabaseService,
  ) {}

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

  public async removeUser(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
