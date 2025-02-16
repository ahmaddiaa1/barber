import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AppSuccess } from 'src/utils/AppSuccess';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllOrders() {
    const orders = await this.prisma.order.findMany({});
    return new AppSuccess(orders, 'Orders fetched successfully');
  }

  async getOrderById(id: string) {
    const order = await this.findOneOrFail(id);
    return new AppSuccess(order, 'Order fetched successfully');
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

    const promoCode = createOrderDto.promoCode;

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

    const { data } = await this.getSlots(
      dataWithoutTime,
      createOrderDto.barberId,
    );

    if (!data.slots.find((slot: string) => slot === createOrderDto.slot)) {
      throw new ConflictException(
        `Slot ${createOrderDto.slot} is not available for booking.`,
      );
    }

    return await this.prisma.order.create({
      data: {
        ...createOrderDto,
        slot: createOrderDto.slot,
        userId,
        date: new Date(dataWithoutTime),
        promoCode: validPromoCode?.id,
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
    const dateWithoutTime = date.split('T')[0];

    const [orders, allSlotsData] = await Promise.all([
      this.prisma.order.findMany({
        where: { date: new Date(dateWithoutTime), barberId },
        select: {
          slot: true,
          service: { select: { duration: true } },
        },
      }),
      this.prisma.slot.findFirst({ select: { slot: true } }),
    ]);

    if (!allSlotsData)
      throw new ConflictException('No slots found in the database.');

    const allSlots = allSlotsData.slot;
    const blockedSlots = new Set<string>();

    // Compute blocked slots
    for (const order of orders) {
      const startIndex = allSlots.indexOf(order.slot);
      if (startIndex === -1) continue;

      const totalDuration = order.service.reduce(
        (sum, s) => sum + s.duration,
        0,
      );
      allSlots
        .slice(startIndex, startIndex + totalDuration)
        .forEach((slot) => blockedSlots.add(slot));
    }

    // Get available slots
    const availableSlots = allSlots.filter((slot) => !blockedSlots.has(slot));

    return new AppSuccess(
      { slots: availableSlots },
      'Slots fetched successfully',
    );
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
    const existingSlots = await this.prisma.slot.findFirst();

    if (!existingSlots) {
      const slots = await this.prisma.slot.create({
        data: {
          start,
          end,
          slot: slotsArray,
        },
      });

      return new AppSuccess(slots, 'Slots created successfully');
    }
    const slots = await this.prisma.slot.updateMany({
      data: {
        start,
        end,
        slot: slotsArray,
      },
    });

    return new AppSuccess(slots, 'Slots updated successfully');
  }

  private async findOneOrFail(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        service: true,
        barber: { include: { barber: true } },
      },
    });
    if (!order) {
      throw new ConflictException(`Order with ID "${id}" not found`);
    }

    return order;
  }
}
