import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateComplainDto } from './dto/create-complain.dto';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AppSuccess } from 'src/utils/AppSuccess';

@Injectable()
export class ComplainService {
  constructor(private readonly prisma: PrismaService) {}

  async createComplain(
    createComplainDto: CreateComplainDto,
    user: User,
  ): Promise<AppSuccess> {
    const complain = await this.prisma.complain.create({
      data: {
        ...createComplainDto,
        client: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    return new AppSuccess(complain, 'Complain created successfully');
  }

  async getAllComplains(): Promise<AppSuccess> {
    const complains = await this.prisma.complain.findMany({
      include: {
        client: {
          select: {
            user: {
              select: {
                id: false,
                firstName: true,
                lastName: true,
                avatar: true,
                phone: true,
              },
            },
          },
        },
      },
    });

    return new AppSuccess({ complains }, 'Complains found successfully');
  }

  async findOne(id: string): Promise<AppSuccess> {
    const complain = await this.prisma.complain.findUnique({
      where: {
        id,
      },
      include: {
        client: {
          select: {
            user: {
              select: {
                id: false,
                firstName: true,
                lastName: true,
                avatar: true,
                phone: true,
              },
            },
          },
        },
      },
    });

    if (!complain) throw new NotFoundException('Complain not found');

    return new AppSuccess(complain, 'Complain found successfully');
  }

  async remove(id: string): Promise<AppSuccess> {
    const complain = await this.prisma.complain.findUnique({
      where: { id },
    });

    if (!complain) throw new NotFoundException('Complain not found');

    return new AppSuccess(
      await this.prisma.complain.delete({
        where: {
          id,
        },
      }),
      'Complain deleted successfully',
    );
  }
}
