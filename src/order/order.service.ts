import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllOrders() {
    return this.prisma.order.findMany();
  }

  async getOrderById(id: string) {
    return this.findOneOrFail(id);
  }

  async createOrder(createOrderDto: any, userId: string) {
    return this.prisma.order.create({
      data: {
        userId,
        date: new Date(createOrderDto.date),
        service: {
          connect: [{ id: createOrderDto.service }],
        },
        ...createOrderDto,
      },
    });
  }

  private async findOneOrFail(id: string) {
    return this.prisma.order.findUnique({
      where: { id },
    });
  }
}
