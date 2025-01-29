import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllOrders() {
    return this.prisma.order.findMany();
  }

  async getOrderById(id: string) {
    return this.prisma.order.findUnique({
      where: { id },
      include: {
        service: true,
        barber: {
          include: {
            barber: true,
          },
        },
      },
    });
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
        barberId: createOrderDto.barberId,
        date: new Date(dataWithoutTime),
        slot: createOrderDto.slot,
        OR: [
          { status: 'PENDING' },
          { status: 'IN_PROGRESS' },
          { booking: 'UPCOMING' },
        ],
      },
    });

    if (existingOrder) {
      throw new ConflictException(
        `Slot ${createOrderDto.slot} is already booked`,
      );
    }

    const promoCode = createOrderDto.promoCodeId;

    const validPromoCode = await this.prisma.promoCode.findFirst({
      where: {
        code: promoCode,
        expiredAt: {
          gte: new Date(),
        },
      },
    });

    if (promoCode && !validPromoCode) {
      throw new ConflictException(
        `Promo code "${promoCode}" is invalid or expired.`,
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

    let total = subTotal;

    if (promoCode && validPromoCode?.type === 'PERCENTAGE') {
      total = subTotal - (subTotal * validPromoCode.discount) / 100;
    } else if (promoCode && validPromoCode?.type === 'AMOUNT') {
      total = subTotal - validPromoCode.discount;
    }

    const slots = await this.getSlots(dataWithoutTime, createOrderDto.barberId);

    if (!slots.find((slot) => slot.slot === createOrderDto.slot)) {
      throw new ConflictException(
        `Slot ${createOrderDto.slot} is not available for booking.`,
      );
    }

    return this.prisma.order.create({
      data: {
        ...createOrderDto,
        slot: createOrderDto.slot,
        userId,
        date: new Date(dataWithoutTime),
        promoCodeId: validPromoCode?.id,
        service: {
          connect: createOrderDto.service.map((serviceId) => ({
            id: serviceId,
          })),
        },
        barberId: createOrderDto.barberId,
        subTotal,
        total,
      },
      include: {
        service: true,
      },
    });
  }

  async getSlots(date: string, barberId: string) {
    const dateWithoutTime = date.toString().split('T')[0];

    const orders = await this.prisma.order.findMany({
      where: {
        date: new Date(dateWithoutTime),
        barberId,
      },
      select: {
        slot: true,
      },
    });

    console.log('orders', orders);

    const unavailableSlots = orders.map((order) => order.slot);

    const allSlots = await this.prisma.slot.findFirst({
      select: {
        slot: true,
      },
    });

    if (!allSlots) {
      throw new Error('No slots found in the database.');
    }

    return allSlots.slot.map((slot) => ({
      slot,
      available: !unavailableSlots.includes(slot),
    }));
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

    const existingSlots = await this.prisma.slot.findMany();

    if (existingSlots.length) {
      return this.prisma.slot.updateMany({
        data: {
          start,
          end,
          slot: slotsArray,
        },
      });
    }

    return this.prisma.slot.create({
      data: {
        start,
        end,
        slot: slotsArray,
      },
    });
  }

  private async findOneOrFail(id: string) {
    return this.prisma.order.findUnique({
      where: { id },
      include: {
        service: true,
        barber: { include: { barber: true } },
      },
    });
  }
}
