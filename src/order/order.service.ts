import {
  ConflictException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AppSuccess } from 'src/utils/AppSuccess';
import { PromoCodeService } from 'src/promo-code/promo-code.service';
import dateformat from 'dateformat';

@Injectable()
export class OrderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly promoCodeService: PromoCodeService,
  ) {}

  async getAllOrders() {
    const orders = await this.prisma.order.findMany({});
    return new AppSuccess(orders, 'Orders fetched successfully');
  }

  async getOrderById(id: string) {
    const order = await this.findOneOrFail(id);
    return new AppSuccess(order, 'Order fetched successfully');
  }

  async GetData(createOrderDto: CreateOrderDto, userId: string) {
    const { promoCode, service, slot, barberId, date, branchId } =
      createOrderDto;

    const dateWithoutTime = date.toString().split('T')[0];

    const order = await this.prisma.order.findFirst({
      where: {
        barberId: barberId,
        date: new Date(dateWithoutTime),
        slot: slot,
        OR: [
          { status: 'PENDING' },
          { status: 'IN_PROGRESS' },
          { booking: 'UPCOMING' },
        ],
      },
    });

    if (order)
      throw new ConflictException(
        `Slot ${createOrderDto.slot} is already booked`,
      );

    const { data } = await this.getSlots(dateWithoutTime, barberId);
    const validPromoCode =
      promoCode &&
      (await this.promoCodeService.validatePromoCode(promoCode)).data;

    const services = await this.prisma.service.findMany({
      where: {
        id: {
          in: service,
        },
      },
      include: {
        PackagesServices: {
          select: {
            id: true,
          },
        },
      },
    });

    const client = await this.prisma.client.findUnique({
      where: {
        id: userId,
      },
      select: {
        ClientPackages: {
          where: { isActive: true, type: 'SINGLE' },
          select: {
            type: true,
            packageService: {
              where: { isActive: true, remainingCount: { gt: 0 } },
              select: {
                service: {
                  select: {
                    id: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const clientPackageServiceIds = client.ClientPackages.flatMap((pkg) =>
      pkg.packageService.map((service) => service.service.id),
    );

    const modifiedServices = services.map((service) => ({
      ...service,
      isFree: clientPackageServiceIds.includes(service.id),
    }));

    const chargeableServices = modifiedServices.filter(
      (service) => !service.isFree,
    );

    const branch = await this.prisma.branch.findUnique({
      where: { id: branchId },
      select: {
        name: true,
        barber: {
          where: { id: barberId },
          select: {
            user: { include: { barber: true } },
          },
        },
      },
    });

    if (!services.length)
      throw new NotFoundException('No services found with the given ids.');

    if (!data.slots.find((slot: string) => slot === createOrderDto.slot)) {
      throw new ServiceUnavailableException(
        `Slot ${slot} is not available for booking.`,
      );
    }
    const type = validPromoCode?.type;
    const dis = validPromoCode?.discount;

    const subTotal = chargeableServices.reduce(
      (acc, service) => acc + service.price,
      0,
    );

    const discount = promoCode
      ? type === 'PERCENTAGE'
        ? (subTotal * dis) / 100
        : dis
      : 0;

    const total = Math.max(subTotal - discount, 0);

    const duration =
      services.reduce((acc, service) => acc + service.duration, 0) * 15;

    const OrderDate = dateformat(dateWithoutTime, 'dddd, mmmm dS, yyyy');

    return new AppSuccess(
      {
        date: OrderDate,
        startTime: slot,
        duration: `${duration} Minutes`,
        branch: branch.name,
        user: branch.barber[0].user,
        service: modifiedServices,
        subTotal: subTotal.toString(),
        discount: promoCode
          ? type === 'PERCENTAGE'
            ? `${dis}%`
            : `${dis}EGP`
          : 0,
        total: total.toString(),
      },
      'Data fetched successfully',
    );
  }

  async createOrder(createOrderDto: CreateOrderDto, userId: string) {
    const dataWithoutTime = createOrderDto.date.toString().split('T')[0];
    const { slot, service, barberId, packages, branchId, ...rest } =
      createOrderDto;

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

    const client = await this.prisma.client.findUnique({
      where: {
        id: userId,
      },
      select: {
        ClientPackages: {
          where: { isActive: true, type: 'SINGLE' },
          select: {
            type: true,
            packageService: {
              where: { isActive: true, remainingCount: { gt: 0 } },
              select: {
                service: {
                  select: {
                    id: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    const barber = await this.prisma.barber.findUnique({
      where: { id: createOrderDto.barberId },
    });
    const branch = await this.prisma.branch.findUnique({
      where: { id: branchId },
    });
    const Services = await this.prisma.service.findMany({
      where: { id: { in: service } },
    });

    if (!barber) throw new NotFoundException('Barber not found');
    if (!client) throw new NotFoundException('Client not found');
    if (!branch) throw new NotFoundException('Branch not found');
    if (!Services || !Services.length)
      throw new NotFoundException('Service not found');

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

    const clientPackageServiceIds = client.ClientPackages.flatMap((pkg) =>
      pkg.packageService.map((service) => service.service.id),
    );

    console.log('clientPackageServiceIds', clientPackageServiceIds);

    const modifiedServices = services.map((service) => ({
      ...service,
      isFree: clientPackageServiceIds.includes(service.id),
    }));

    const chargeableServices = modifiedServices.filter(
      (service) => !service.isFree,
    );

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

    const subTotal = chargeableServices.reduce(
      (acc, service) => acc + service.price,
      0,
    );

    let total = Math.max(subTotal, 0);

    if (promoCode && validPromoCode?.type === 'PERCENTAGE') {
      total = subTotal - (subTotal * validPromoCode.discount) / 100;
    } else if (promoCode && validPromoCode?.type === 'AMOUNT') {
      total = subTotal - validPromoCode.discount;
    }

    const { data } = await this.getSlots(
      dataWithoutTime,
      createOrderDto.barberId,
    );

    if (!data.slots.find((slots: string) => slots === slot)) {
      throw new ConflictException(
        `Slot ${createOrderDto.slot} is not available for booking.`,
      );
    }

    const order = await this.prisma.order.create({
      data: {
        ...rest,
        ...(validPromoCode && { promoCode: validPromoCode?.id }),
        slot,
        userId,
        barberId,
        branchId,
        date: new Date(dataWithoutTime),
        service: {
          connect: modifiedServices.map((service) => ({ id: service.id })),
        },
        subTotal,
        total,
      },
      include: {
        service: {
          include: {
            PackagesServices: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    });

    const packageServiceIds = order.service.flatMap((s) =>
      s.PackagesServices.map((ps) => ps.id),
    );

    await this.prisma.packagesServices.updateMany({
      where: {
        id: { in: packageServiceIds },
        ClientPackages: { clientId: order.userId },
        isActive: true,
      },
      data: {
        isActive: false,
        usedAt: new Date(),
        remainingCount: {
          decrement: 1,
        },
      },
    });

    return new AppSuccess(order, 'Order created successfully');
  }

  async cancelOrder(id: string) {
    const updatedOrder = await this.prisma.order.update({
      where: { id },
      include: {
        service: {
          include: {
            PackagesServices: {
              select: {
                id: true,
              },
            },
          },
        },
      },
      data: { status: 'CANCELLED' },
    });

    if (
      updatedOrder.status === 'IN_PROGRESS' ||
      updatedOrder.status === 'COMPLETED' ||
      updatedOrder.status === 'PAID'
    ) {
      throw new ConflictException(
        'Order cannot be cancelled, it has already started or completed.',
      );
    }

    const packageServiceIds = updatedOrder.service.flatMap((s) =>
      s.PackagesServices.map((ps) => ps.id),
    );

    await this.prisma.packagesServices.updateMany({
      where: {
        id: { in: packageServiceIds },
        ClientPackages: { clientId: updatedOrder.userId },
        isActive: false,
      },
      data: {
        isActive: true,
        usedAt: null,
        remainingCount: {
          increment: 1,
        },
      },
    });

    return new AppSuccess(updatedOrder, 'Order cancelled successfully');
  }

  async startOrder(id: string) {
    const updatedOrder = await this.prisma.order.update({
      where: { id },
      data: { status: 'IN_PROGRESS' },
    });

    return new AppSuccess(updatedOrder, 'Order started successfully');
  }

  async completeOrder(id: string) {
    const updatedOrder = await this.prisma.order.update({
      where: { id },
      data: { status: 'COMPLETED' },
      include: {
        service: {
          include: {
            PackagesServices: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    });

    const packageServiceIds = updatedOrder.service.flatMap((s) =>
      s.PackagesServices.map((ps) => ps.id),
    );

    await this.prisma.packagesServices.deleteMany({
      where: {
        id: { in: packageServiceIds },
        ClientPackages: {
          clientId: updatedOrder.userId,
        },
      },
    });

    return new AppSuccess(
      updatedOrder,
      'Order completed successfully, used services removed.',
    );
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
