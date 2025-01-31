import { Injectable } from '@nestjs/common';
import { CreateComplainDto } from './dto/create-complain.dto';
import { UpdateComplainDto } from './dto/update-complain.dto';
import { Complain, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ComplainService {

  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async createComplain(createComplainDto: CreateComplainDto, user: User): Promise<Complain> {
    return await this.prisma.complain.create({
      data: {
        ...createComplainDto,
        userId: user.id,
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
              }
            }
          },
        },
      },
    })
  }

  async getAllComplains(): Promise<Complain[]> {
    return await this.prisma.complain.findMany({
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
              }
            }
          },
        },
      },
    });
  }

  findOne(id: string): Promise<Complain> {
    return this.prisma.complain.findUnique({
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
              }
            }
          },
        },
      },
    });
  }

 

  remove(id: string): Promise<Complain> {
    return this.prisma.complain.delete({
      where: {
        id,
      },
    });
  }
}
