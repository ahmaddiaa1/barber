import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePointDto } from './dto/create-point.dto';
import { UpdatePointDto } from './dto/update-point.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AppSuccess } from 'src/utils/AppSuccess';
import { User } from '@prisma/client';

@Injectable()
export class PointsService {
  constructor(private prisma: PrismaService) {}

  async create(offerId: string, user: User) {
    const offers = await this.prisma.offers.findUnique({
      where: {
        id: offerId,
      },
      select: {
        offerType: true,
        points: {
          select: {
            title: true,
            price: true,
            points: true,
          },
        },
      },
    });

    if (!user) throw new NotFoundException('User not found');

    const updateUser = await this.prisma.client.update({
      where: {
        id: user.id,
      },
      data: {
        points: { increment: offers.points.points },
      },
    });
    return new AppSuccess(updateUser, 'Points added successfully');
  }

  async createPoints(createPointDto: CreatePointDto) {
    const { title, price, points } = createPointDto;

    const offer = await this.prisma.offers.create({
      data: {
        offerType: 'POINTS',
        expiresAt: new Date(),
      },
    });

    const point = await this.prisma.offers.update({
      where: { id: offer.id },
      data: {
        points: {
          create: {
            title,
            price,
            points,
          },
        },
      },
    });

    return new AppSuccess(point, 'Point created successfully');
  }

  async findAll() {
    const points = await this.prisma.points.findMany({});

    return new AppSuccess({ points }, 'Points fetched successfully');
  }

  async findOne(id: string) {
    if (!id) {
      return new AppSuccess(null, 'Point not found');
    }

    const point = await this.prisma.points.findUnique({
      where: {
        id: id,
      },
    });

    return new AppSuccess(point, 'Point fetched successfully');
  }

  async purchasePoint(user: User, pointId: string) {
    const client = await this.prisma.client.findUnique({
      where: {
        id: user.id,
      },
    });

    if (!client) {
      return new AppSuccess(null, 'client not found');
    }

    const point = await this.prisma.points.findUnique({
      where: {
        id: pointId,
      },
    });

    if (!point) {
      return new AppSuccess(null, 'Point not found');
    }

    const clientPoint = await this.prisma.client.update({
      where: {
        id: user.id,
      },
      data: {
        points: client.points + point.points,
      },
    });

    return new AppSuccess(clientPoint, 'Point purchased successfully');
  }

  update(id: number, updatePointDto: UpdatePointDto) {
    return `This action updates a #${id} point`;
  }

  remove(id: number) {
    return `This action removes a #${id} point`;
  }
}
