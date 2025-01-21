import { ConflictException, Injectable } from '@nestjs/common';
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
    const dateWithoutTime = date.toString().split('T')[0];
    const parsedDate = new Date(dateWithoutTime);
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
    const dataWithoutTime = createOrderDto.date.toString().split('T')[0];

    const existingOrder = await this.prisma.order.findFirst({
      where: {
        date: new Date(dataWithoutTime),
        slot: createOrderDto.slot,
        status: 'PENDING',
        booking: 'UPCOMING',
      },
    });

    if (existingOrder)
      throw new ConflictException(
        `The selected date (${dataWithoutTime}) and time slot (${createOrderDto.slot}) are already booked. Please choose another date or time slot.`,
      );

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
        date: new Date(dataWithoutTime),
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

  async generateSlot(start: number, end: number) {
    const slotsArray = [];

    for (let hour = start; hour < end; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const slot = `${hour.toString().padStart(2, '0')}:${minute
          .toString()
          .padStart(2, '0')}`;
        slotsArray.push(
          +slot.split(':')[0] > 11
            ? (+slot.split(':')[0] - 12 === 0 ? 12 : +slot.split(':')[0] - 12)
                .toString()
                .padStart(2, '0') +
                ':' +
                slot.split(':')[1] +
                ' PM'
            : slot + ' AM',
        );
      }
    }

    this.prisma.slot.updateMany({
      data: {
        start,
        end,
        slot: slotsArray,
      },
    });

    return slotsArray;
  }
}
