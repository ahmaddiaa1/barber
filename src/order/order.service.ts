import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AppSuccess } from '../../utils/AppSuccess';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllOrders() {
    return this.prisma.order.findMany();
  }

  async getOrderById(id: string) {
    return this.findOneOrFail(id);
  }

  async getBookedSlots(date: Date) {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      throw new Error(`Invalid date format: ${date}`);
    }

    const bookedSlots = await this.prisma.order.findMany({
      where: {
        date: parsedDate,
        status: 'PENDING',
        booking: 'UPCOMING',
      },
      select: {
        slot: true,
      },
    });

    return bookedSlots.map((order) => order.slot);
  }

  async createOrder(createOrderDto: CreateOrderDto, userId: string) {
    const existingOrder = await this.prisma.order.findFirst({
      where: {
        date: new Date(createOrderDto.date),
        slot: createOrderDto.slot,
        status: 'PENDING',
        booking: 'UPCOMING',
      },
    });

    if (existingOrder) {
      throw new AppSuccess(
        null,
        `The selected date (${createOrderDto.date}) and time slot (${createOrderDto.slot}) are already booked. Please choose another date or time slot.`,
        400,
      );
    }

    const services = await this.prisma.service.findMany({
      where: {
        id: {
          in: createOrderDto.service,
        },
      },
      select: {
        id: true,
        price: true,
      },
    });

    const subTotal = services.reduce((acc, service) => acc + service.price, 0);

    const total = subTotal;

    console.log('services', services);

    return this.prisma.order.create({
      data: {
        ...createOrderDto,
        userId,
        date: new Date(createOrderDto.date),
        service: {
          connect: createOrderDto.service.map((serviceId) => ({
            id: serviceId,
          })),
        },
        subTotal,
        total,
      },
      include: {
        service: true,
      },
    });
  }

  private async findOneOrFail(id: string) {
    return this.prisma.order.findUnique({
      where: { id },
    });
  }
}
