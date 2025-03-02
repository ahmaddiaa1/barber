import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AppSuccess } from 'src/utils/AppSuccess';
import { PromoCodeService } from 'src/promo-code/promo-code.service';
import { Service } from '@prisma/client';

interface PrismaServiceType extends Service {
  isFree: boolean;
}

@Injectable()
export class OrderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly promoCodeService: PromoCodeService,
  ) {}

  async getAllOrders(userId: string) {
    const orders = await this.prisma.order.findMany({
      where: { userId: userId },
    });

    const upcoming = orders.filter((order) => order.booking === 'UPCOMING');
    const completed = orders.filter((order) => order.booking === 'PAST');
    const cancelled = orders.filter((order) => order.booking === 'CANCELLED');

    return new AppSuccess(
      { upcoming, completed, cancelled },
      'Orders fetched successfully',
    );
  }

  async getOrderById(id: string) {
    const order = await this.findOneOrFail(id);

    return new AppSuccess(order, 'Order fetched successfully');
  }

  async GetData(createOrderDto: CreateOrderDto, userId: string) {
    const {
      promoCode,
      service,
      slot,
      barberId,
      date,
      branchId,
      usedPackage,
      points,
    } = createOrderDto;

    const dateWithoutTime = date.toString().split('T')[0];
    let allServices = [] as PrismaServiceType[];

    const [order, usedPromoCode, slots, validPromoCode] = await Promise.all([
      await this.prisma.order.findFirst({
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
      }),
      await this.prisma.user.findFirst({
        where: { id: userId },
        select: {
          UserOrders: {
            where: {
              promoCode: promoCode,
              status: 'PENDING',
            },
          },
        },
      }),
      (await this.getSlots(dateWithoutTime, barberId)).data.slots,
      promoCode &&
        (await this.promoCodeService.validatePromoCode(promoCode)).data,
    ]);

    if (usedPromoCode.UserOrders.length && promoCode)
      throw new ConflictException(
        `Promo code "${promoCode}" is invalid or expired.`,
      );

    if (order) throw new ConflictException(`Slot ${slot} is already booked`);

    if (!slots.includes(slot))
      throw new ServiceUnavailableException(`Slot ${slot} is Unavailable`);

    const clientPackages = await this.prisma.clientPackages.findMany({
      where: {
        clientId: userId,
        packageService: { some: { isActive: true, remainingCount: { gt: 0 } } },
      },
      select: {
        id: true,
        type: true,
        isActive: true,
        packageService: {
          select: { service: true },
        },
      },
    });

    const selectedPackage = clientPackages.filter((pkg) =>
      usedPackage.includes(pkg.id),
    );

    const notValidPackage = selectedPackage.filter((pkg) => !pkg.isActive);

    if (notValidPackage.length > 0) {
      throw new BadRequestException('This package is not valid anymore');
    }

    const single = clientPackages
      .filter((pkg) => pkg.type === 'SINGLE' && pkg.isActive)
      .flatMap((pkg) =>
        pkg.packageService.flatMap((ps) => {
          return { ...ps.service, pkgId: pkg.id };
        }),
      );

    const FetchedServices = await this.prisma.service.findMany({
      where: { id: { in: service } },
    });

    const services = FetchedServices.map((srv) => ({
      ...srv,
      isFree: single.some((s) => s.id === srv.id),
    }));

    allServices.push(...services);

    for (const pkg of selectedPackage) {
      if (pkg.type === 'SINGLE') {
        throw new ConflictException('Can not select Packages of type SINGLE');
      } else {
        const service = pkg.packageService.flatMap((ps) => {
          return { ...ps.service, isFree: true };
        });

        allServices.push(...service);
      }
    }

    const costServices = allServices.filter((service) => !service.isFree);

    const subTotal = costServices.reduce(
      (acc, service) => acc + service.price,
      0,
    );
    const discount = promoCode
      ? validPromoCode?.type === 'PERCENTAGE'
        ? (subTotal * validPromoCode?.discount) / 100
        : validPromoCode?.discount
      : 0;
    const total = Math.max(subTotal - discount, 0);
    const duration =
      allServices.reduce((acc, service) => acc + service.duration, 0) * 15;
    const OrderDate = dateWithoutTime;

    return new AppSuccess(
      {
        date: OrderDate,
        slot,
        barberId,
        branchId,
        points: points?.toString(),
        createdAt: new Date(),
        updatedAt: null,
        duration: `${duration} Minutes`,
        promoCode: promoCode ? promoCode : null,
        subTotal: subTotal?.toString(),
        discount: promoCode
          ? validPromoCode?.type === 'PERCENTAGE'
            ? `${validPromoCode?.discount}%`
            : `${validPromoCode?.discount}EGP`
          : 0,
        total: total?.toString(),
      },
      'Data fetched successfully',
    );
  }

  async createOrder(createOrderDto: CreateOrderDto, userId: string) {
    const {
      slot,
      service,
      barberId,
      packages,
      branchId,
      usedPackage,
      promoCode,
      points,
      ...rest
    } = createOrderDto;

    let allServices = [] as PrismaServiceType[];
    const dateWithoutTime = createOrderDto.date.toString().split('T')[0];

    const [existingOrder, usedPromoCode, slots, validPromoCode, user] =
      await Promise.all([
        await this.prisma.order.findFirst({
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
        }),
        await this.prisma.user.findFirst({
          where: { id: userId },
          select: {
            UserOrders: {
              where: {
                promoCode: promoCode,
                status: 'PENDING',
              },
            },
          },
        }),
        (await this.getSlots(dateWithoutTime, barberId)).data.slots,
        promoCode &&
          (await this.promoCodeService.validatePromoCode(promoCode)).data,
        await this.prisma.user.findUnique({
          where: { id: userId },
          select: { client: { select: { points: true } } },
        }),
      ]);

    if (usedPromoCode.UserOrders.length && promoCode)
      throw new ConflictException(
        `Promo code "${promoCode}" is invalid or expired.`,
      );

    if (existingOrder)
      throw new ConflictException(`Slot ${slot} is already booked`);

    if (!slots.includes(slot))
      throw new ServiceUnavailableException(`Slot ${slot} is Unavailable`);

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
    if (!branch) throw new NotFoundException('Branch not found');
    if (!Services || !Services.length)
      throw new NotFoundException('Service not found');

    const clientPackages = await this.prisma.clientPackages.findMany({
      where: {
        clientId: userId,
        packageService: { some: { isActive: true, remainingCount: { gt: 0 } } },
      },
      select: {
        id: true,
        type: true,
        isActive: true,
        packageService: {
          select: { service: true },
        },
      },
    });

    const selectedPackage = clientPackages.filter((pkg) =>
      usedPackage.includes(pkg.id),
    );

    const notValidPackage = selectedPackage.filter((pkg) => !pkg.isActive);

    if (notValidPackage.length > 0)
      throw new BadRequestException('This package is not valid anymore');

    const single = clientPackages
      .filter((pkg) => pkg.type === 'SINGLE')
      .flatMap((pkg) =>
        pkg.packageService.flatMap((ps) => {
          return { ...ps.service, pkgId: pkg.id };
        }),
      );

    const FetchedServices = await this.prisma.service.findMany({
      where: { id: { in: service } },
    });

    const services = FetchedServices.map((srv) => ({
      ...srv,
      isFree: single.some((s) => s.id === srv.id),
    }));

    allServices.push(...services);

    for (const pkg of selectedPackage) {
      if (pkg.type === 'SINGLE') {
        throw new ConflictException('Can not select Packages of type SINGLE');
      } else {
        const service = pkg.packageService.flatMap((ps) => {
          return { ...ps.service, isFree: true };
        });

        allServices.push(...service);
      }
    }

    const costServices = allServices.filter((service) => !service.isFree);

    const subTotal = costServices.reduce(
      (acc, service) => acc + service.price,
      0,
    );

    let total = Math.max(subTotal, 0);

    if (promoCode && validPromoCode?.type === 'PERCENTAGE') {
      total = subTotal - (subTotal * validPromoCode.discount) / 100;
    } else if (promoCode && validPromoCode?.type === 'AMOUNT') {
      total = subTotal - validPromoCode.discount;
    }

    const d = allServices.sort((a, b) => a.price - b.price)[0].price;
    const point = points >= d ? points : 0;

    points > user.client.points &&
      new ConflictException('you do not have enough points');

    d > points &&
      new ConflictException(
        'Points must be at least equal to the lowest price of the services',
      );

    const order = await this.prisma.order.create({
      data: {
        ...rest,
        ...(validPromoCode && { promoCode }),
        slot,
        userId,
        barberId,
        branchId,
        points: point,
        usedPackage: selectedPackage
          ? selectedPackage.flatMap((e) => e.id)
          : [],
        date: new Date(dateWithoutTime),
        service: {
          connect: allServices.map((service) => ({ id: service.id })),
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

    await this.prisma.$transaction(async (prisma) => {
      const packageService = await prisma.packagesServices.findMany({
        where: {
          id: { in: packageServiceIds },
          ClientPackages: { clientId: order.userId, type: 'SINGLE' },
          isActive: true,
        },
      });

      const pkgServiceIds = packageService.flatMap((ps) => ps.id);

      if (pkgServiceIds.length > 0) {
        await prisma.packagesServices.updateMany({
          where: {
            id: { in: pkgServiceIds },
            ClientPackages: { clientId: order.userId, type: 'SINGLE' },
            isActive: true,
          },
          data: {
            ...(packageService[0].remainingCount < 1 && {
              isActive: false,
            }),
            usedAt: new Date(),
            remainingCount: {
              decrement: 1,
            },
          },
        });
      }

      if (selectedPackage) {
        await this.prisma.clientPackages.updateMany({
          where: {
            id: { in: usedPackage },
            clientId: order.userId,
            type: 'MULTIPLE',
          },
          data: {
            isActive: false,
          },
        });
      }
    });

    const duration =
      allServices.reduce((acc, service) => acc + service.duration, 0) * 15;

    return new AppSuccess(
      {
        date: order.date,
        slot: order.slot,
        barberId: order.barberId,
        branchId: order.branchId,
        points: order.points.toString(),
        createdAt: order.createdAt,
        updatedAt: null,
        duration: `${duration} Minutes`,
        promoCode: promoCode ? promoCode : null,
        subTotal: order.subTotal.toString(),
        discount: promoCode
          ? validPromoCode?.type === 'PERCENTAGE'
            ? `${validPromoCode?.discount}%`
            : `${validPromoCode?.discount}EGP`
          : 0,
        total: order.total.toString(),
      },
      'Order created successfully',
    );
  }

  async cancelOrder(id: string) {
    await this.findOneOrFail(id);

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

    await this.prisma.$transaction(async (prisma) => {
      if (packageServiceIds.length > 0) {
        await prisma.packagesServices.updateMany({
          where: {
            id: { in: packageServiceIds },
            ClientPackages: { clientId: updatedOrder.userId, type: 'SINGLE' },
          },
          data: {
            isActive: true,
            usedAt: null,
            remainingCount: {
              increment: 1,
            },
          },
        });
      }

      if (updatedOrder.usedPackage) {
        await prisma.clientPackages.updateMany({
          where: {
            id: { in: updatedOrder.usedPackage },
            clientId: updatedOrder.userId,
            type: 'MULTIPLE',
          },
          data: {
            isActive: true,
          },
        });
      }
    });

    return new AppSuccess(updatedOrder, 'Order cancelled successfully');
  }

  async startOrder(id: string) {
    await this.findOneOrFail(id);

    const updatedOrder = await this.prisma.order.update({
      where: { id },
      data: { status: 'IN_PROGRESS' },
    });

    return new AppSuccess(updatedOrder, 'Order started successfully');
  }

  async completeOrder(id: string) {
    await this.findOneOrFail(id);

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

    await this.prisma.$transaction(async (prisma) => {
      if (packageServiceIds.length > 0) {
        await this.prisma.packagesServices.deleteMany({
          where: {
            id: { in: packageServiceIds },
            ClientPackages: {
              clientId: updatedOrder.userId,
            },
            remainingCount: { lt: 1 },
          },
        });
      }

      if (updatedOrder.usedPackage) {
        await prisma.clientPackages.deleteMany({
          where: {
            id: { in: updatedOrder.usedPackage },
            clientId: updatedOrder.userId,
          },
        });
      }
    });

    return new AppSuccess(
      updatedOrder,
      'Order completed successfully, used services removed.',
    );
  }

  async paidOrder(id: string, userId: string) {
    await this.findOneOrFail(id);

    const updatedOrder = await this.prisma.order.update({
      where: { id },
      data: { status: 'PAID', cashierId: userId },
    });

    return new AppSuccess(updatedOrder, 'Order marked as paid');
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

    if (!Number.isInteger(start) || !Number.isInteger(end))
      throw new ConflictException(
        'Start and end must not be decimal, negative or string.',
      );

    if (start < 0 || start >= 24 || end < 0 || end > 24) {
      throw new ConflictException(
        'Start and end must be Integer numbers between 0 and 24.',
      );
    }

    // Ensure start is less than end
    if (start >= end) {
      throw new ConflictException('Start time must be less than end time.');
    }

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

    const findFirst = await this.prisma.slot.findFirst();
    const slots = await this.prisma.slot.update({
      where: { id: findFirst.id },
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
