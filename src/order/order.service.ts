import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AppSuccess } from 'src/utils/AppSuccess';
import { PromoCodeService } from 'src/promo-code/promo-code.service';
import { Language, Role, Service } from '@prisma/client';
import { format } from 'date-fns';
import { Translation } from 'src/class-type/translation';
import { UpdateOrderDto } from './dto/update-order.dto';

interface PrismaServiceType extends Service {
  isFree: boolean;
}

@Injectable()
export class OrderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly promoCodeService: PromoCodeService,
  ) {}

  async getNonSelectedServices(id: string, language: Language) {
    const order = await this.findOneOrFail(id);

    const FetchedCategory = await this.prisma.category.findMany({
      include: {
        Translation: true,
        services: {
          where: {
            id: {
              notIn: order.service.flatMap((o) => o.id),
            },
          },
          include: {
            Translation: true,
          },
        },
      },
    });

    const category = FetchedCategory.map((category) => {
      const { Translation, services, ...rest } = category;
      return {
        ...rest,
        nameEN: Translation.find((t) => t.language === 'EN')?.name,
        nameAR: Translation.find((t) => t.language === 'AR')?.name,
        name: Translation.find((t) => t.language === language)?.name,
        services: services.map((service) => {
          const { Translation, ...rest } = service;
          return {
            ...rest,
            nameEN: Translation.find((t) => t.language === 'EN')?.name,
            nameAR: Translation.find((t) => t.language === 'AR')?.name,
            name: Translation.find((t) => t.language === language)?.name,
          };
        }),
      };
    });

    return new AppSuccess({ category }, 'Services found successfully');
  }

  async getAllOrders(userId: string, lang: Language) {
    const fetchedOrders = await this.prisma.order.findMany({
      where: { userId: userId },
      include: {
        barber: { include: { barber: { include: { user: true } } } },
        branch: { include: Translation(false, lang) },
        service: true,
      },
    });

    const orders = await Promise.all(
      fetchedOrders.map(async (order) => {
        const {
          barber,
          date,
          total,
          subTotal,
          discount,
          points,
          service,
          branch: { Translation, ...branchRest },
          booking,
          ...rest
        } = order;

        const usedPackage = await this.prisma.clientPackages.findMany({
          where: { id: { in: order.usedPackage } },
        });

        const usedPackageIds = usedPackage.flatMap((u) => u.packageId);

        const packageServices = await this.prisma.packages.findMany({
          where: { id: { in: usedPackageIds } },
          include: { services: true },
        });

        const allServices = [
          ...service,
          ...packageServices.flatMap((p) => p.services),
        ];

        const duration = (
          allServices.reduce((total, service) => total + service.duration, 0) *
          30
        ).toString();

        return {
          ...rest,
          booking,
          date: format(new Date(date), 'yyyy-MM-dd'),
          duration: `${duration} ${lang === 'EN' ? 'Minutes' : 'دقيقة'}`,
          barber: barber.barber,
          total: total.toString(),
          subTotal: subTotal.toString(),
          discount: (total - subTotal).toString(),
          points: points.toString(),
          usedPackage: packageServices,
          service,
          branch: {
            ...branchRest,
            name: Translation[0].name,
          },
        };
      }),
    );

    const upcoming = orders.filter((order) => order.booking === 'UPCOMING');
    const completed = orders.filter((order) => order.booking === 'PAST');
    const cancelled = orders.filter((order) => order.booking === 'CANCELLED');

    return new AppSuccess(
      { upcoming, completed, cancelled },
      'Orders fetched successfully',
    );
  }

  async getPayedOrders(lang: Language) {
    const fetchedOrders = await this.prisma.order.findMany({
      where: { date: new Date(), status: 'COMPLETED' },
      include: {
        barber: { include: { barber: { include: { user: true } } } },
        branch: { include: Translation(false, lang) },
        service: true,
      },
    });
    const orders = await Promise.all(
      fetchedOrders.map(async (order) => {
        const {
          barber,
          date,
          total,
          subTotal,
          discount,
          points,
          service,
          branch: { Translation, ...branchRest },
          booking,
          ...rest
        } = order;

        const usedPackage = await this.prisma.clientPackages.findMany({
          where: { id: { in: order.usedPackage } },
        });

        const usedPackageIds = usedPackage.flatMap((u) => u.packageId);

        const packageServices = await this.prisma.packages.findMany({
          where: { id: { in: usedPackageIds } },
          include: { services: true },
        });

        const allServices = [
          ...service,
          ...packageServices.flatMap((p) => p.services),
        ];

        const duration = (
          allServices.reduce((total, service) => total + service.duration, 0) *
          30
        ).toString();

        return {
          ...rest,
          booking,
          date: format(new Date(date), 'yyyy-MM-dd'),
          duration: `${duration} ${lang === 'EN' ? 'Minutes' : 'دقيقة'}`,
          barber: barber.barber,
          total: total.toString(),
          subTotal: subTotal.toString(),
          discount: (total - subTotal).toString(),
          points: points.toString(),
          usedPackage: packageServices,
          service,
          branch: {
            ...branchRest,
            name: Translation[0].name,
          },
        };
      }),
    );

    return new AppSuccess({ orders }, 'Orders fetched successfully');
  }

  async GetBarberOrders(barberId: string, language: Language) {
    const fetchedOrders = await this.prisma.order.findMany({
      include: {
        barber: { include: { barber: { include: { user: true } } } },
        branch: { include: Translation(false) },
        service: { include: { Translation: true } },
      },
    });

    const orders = await Promise.all(
      fetchedOrders.map(async (order) => {
        const {
          barber,
          date,
          total,
          subTotal,
          discount,
          points,
          service,
          branch: { Translation, ...branchRest },
          booking,
          ...rest
        } = order;

        const usedPackage = await this.prisma.clientPackages.findMany({
          where: { id: { in: order.usedPackage } },
        });

        const usedPackageIds = usedPackage.flatMap((u) => u.packageId);

        const packageServices = await this.prisma.packages.findMany({
          where: { id: { in: usedPackageIds } },
          include: { services: true },
        });

        const allServices = [
          ...service,
          ...packageServices.flatMap((p) => p.services),
        ];

        const duration = (
          allServices.reduce((total, service) => total + service.duration, 0) *
          30
        ).toString();

        const services = service.map((s) => {
          const { Translation, ...rest } = s;
          return {
            ...rest,
            nameEN: Translation.find((t) => t.language === 'EN')?.name,
            nameAR: Translation.find((t) => t.language === 'AR')?.name,
            name: Translation.find((t) => t.language === language)?.name,
          };
        });

        return {
          ...rest,
          booking,
          date: format(new Date(date), 'yyyy-MM-dd'),
          duration: `${duration} ${language === 'EN' ? 'Minutes' : 'دقيقة'}`,
          barber: barber.barber,
          total: total.toString(),
          subTotal: subTotal.toString(),
          discount: (total - subTotal).toString(),
          points: points.toString(),
          usedPackage: packageServices,
          services,
          branch: {
            ...branchRest,
            nameEN: Translation.find((t) => t.language === 'EN')?.name,
            nameAR: Translation.find((t) => t.language === 'AR')?.name,
            name: Translation.find((t) => t.language === language)?.name,
          },
        };
      }),
    );

    return new AppSuccess({ orders }, 'Orders fetched successfully');
  }

  async getOrderById(id: string) {
    const order = await this.findOneOrFail(id);

    return new AppSuccess(order, 'Order fetched successfully');
  }

  async GetData(
    createOrderDto: CreateOrderDto,
    userId: string,
    lang: Language,
  ) {
    const {
      promoCode,
      service,
      slot,
      barberId,
      date,
      branchId,
      usedPackage,
      points,
      phone,
    } = createOrderDto;

    const dateWithoutTime = date.toString().split('T')[0];
    let allServices = [] as PrismaServiceType[];

    const another =
      phone &&
      phone !== '' &&
      (await this.prisma.user.findUnique({ where: { phone } }));
    userId = another ? another.id : userId;

    const [order, usedPromoCode, slots, validPromoCode, user] =
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
            client: { select: { points: true } },
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
          where: { phone },
          select: { client: { select: { ban: true } } },
        }),
      ]);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const settings = await this.prisma.settings.findFirst({});

    if (settings.pointLimit > points) {
      throw new BadRequestException('You have exceeded the points limit');
    }

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

    return new AppSuccess(
      {
        date: format(new Date(dateWithoutTime), 'yyyy-MM-dd'),
        slot,
        barberId,
        branchId,
        canUsePoints: settings.pointLimit < usedPromoCode.client.points,
        points: points?.toString(),
        createdAt: new Date(),
        updatedAt: null,
        duration: `${duration} ${lang === 'EN' ? 'Minutes' : 'دقيقة'}`,
        promoCode: promoCode ? promoCode : null,
        subTotal: subTotal?.toString(),
        discount: promoCode
          ? validPromoCode?.type === 'PERCENTAGE'
            ? `${validPromoCode?.discount}%`
            : `${validPromoCode?.discount}EGP`
          : '0',
        total: (total - points).toString(),
      },
      'Data fetched successfully',
    );
  }

  async createOrder(
    createOrderDto: CreateOrderDto,
    userId: string,
    lang: Language,
  ) {
    const {
      slot,
      service,
      barberId,
      packages,
      branchId,
      usedPackage,
      promoCode,
      points,
      phone,
      ...rest
    } = createOrderDto;

    let allServices = [] as PrismaServiceType[];
    const dateWithoutTime = createOrderDto.date.toString().split('T')[0];

    const another = await this.prisma.user.findUnique({ where: { phone } });

    userId = another.id ?? userId;

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
          select: { client: { select: { points: true, ban: true } } },
        }),
      ]);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.client.ban) {
      throw new BadRequestException('You are banned');
    }

    const settings = await this.prisma.settings.findFirst({});

    if (settings.pointLimit > points) {
      throw new BadRequestException('You have exceeded the points limit');
    }

    if (usedPromoCode.UserOrders.length && promoCode) {
      throw new ConflictException(
        `Promo code "${promoCode}" is invalid or expired.`,
      );
    }

    if (existingOrder) {
      throw new ConflictException(`Slot ${slot} is already booked`);
    }

    if (!slots.includes(slot)) {
      throw new ServiceUnavailableException(`Slot ${slot} is Unavailable`);
    }

    const barber = await this.prisma.barber.findUnique({
      where: { id: barberId },
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

    const PointsLimit = allServices.sort((a, b) => a.price - b.price)[0].price;

    const point = points >= PointsLimit ? points : 0;

    points > user.client?.points &&
      new ConflictException('you do not have enough points');

    PointsLimit > points &&
      new ConflictException(
        'the number of Points must be at least equal to the lowest price of the services',
      );
    if (user.client.ban) throw new ForbiddenException('You are banned');
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
        total: total - points,
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
        date: format(order.date, 'yyyy-MM-dd'),
        slot: order.slot,
        barberId: order.barberId,
        branchId: order.branchId,
        points: order.points?.toString(),
        createdAt: order.createdAt,
        updatedAt: null,
        duration: `${duration} ${lang === 'AR' ? 'دقيقة' : 'minutes'}`,
        promoCode: promoCode ? promoCode : null,
        subTotal: order.subTotal?.toString(),
        discount: promoCode
          ? validPromoCode?.type === 'PERCENTAGE'
            ? `${validPromoCode?.discount}%`
            : `${validPromoCode?.discount}EGP`
          : '0',
        total: order.total?.toString(),
      },
      'Order created successfully',
    );
  }

  async updateOrder(id: string, updateOrderDto: UpdateOrderDto, Role: Role) {
    const order = await this.findOneOrFail(id);

    if (
      !(
        (order.status === 'PENDING' && Role === 'USER') ||
        (order.status === 'IN_PROGRESS' && Role === 'BARBER')
      )
    ) {
      throw new ConflictException(
        'Order cannot be updated, it has already started or completed.',
      );
    }

    const { add, remove, addPackage, removePackage, ...rest } = updateOrderDto;
    const user = await this.prisma.user.findUnique({
      where: { id: order.userId },
      select: {
        client: {
          select: {
            ClientPackages: {
              include: {
                packageService: true,
              },
            },
          },
        },
      },
    });

    if (order.service.flatMap((s) => s.id).some((id) => add.includes(id))) {
      throw new BadRequestException('Service already added');
    }

    const clientPackages = user.client?.ClientPackages ?? [];

    const singlePackages = clientPackages.filter(
      (pkg) => pkg.type === 'SINGLE',
    );
    const multiPackages = clientPackages.filter(
      (pkg) => pkg.type === 'MULTIPLE',
    );
    let subTotal = order.subTotal;
    let total = order.total;

    for (const serviceId of add) {
      const singlePackageService = singlePackages
        .flatMap((pkg) => pkg.packageService)
        .find((pkgService) => pkgService.serviceId === serviceId);

      if (singlePackageService) {
        if (
          singlePackageService.remainingCount &&
          singlePackageService.remainingCount > 0
        ) {
          await this.prisma.packagesServices.update({
            where: { id: singlePackageService.id },
            data: { remainingCount: singlePackageService.remainingCount - 1 },
          });
          const service = await this.prisma.service.findUnique({
            where: { id: singlePackageService.serviceId },
            select: { price: true },
          });
          subTotal += service.price;
        } else {
          const service = await this.prisma.service.findUnique({
            where: { id: serviceId },
            select: { price: true },
          });
          subTotal += service.price;
          total += service.price;
        }
      } else {
        const service = await this.prisma.service.findUnique({
          where: { id: serviceId },
          select: { price: true },
        });
        subTotal += service.price;
        total += service.price;
      }
    }

    for (const serviceId of remove) {
      const singlePackageService = singlePackages
        .flatMap((pkg) => pkg.packageService)
        .find((pkgService) => pkgService.serviceId === serviceId);

      if (singlePackageService) {
        if (
          singlePackageService.remainingCount === 0 ||
          !singlePackageService.isActive
        ) {
          await this.prisma.packagesServices.update({
            where: { id: singlePackageService.id },
            data: {
              isActive: true,
              remainingCount: (singlePackageService.remainingCount || 0) + 1,
            },
          });
          const service = await this.prisma.service.findUnique({
            where: { id: singlePackageService.serviceId },
            select: { price: true },
          });

          total -= service.price;
          subTotal -= service.price;
        } else {
          await this.prisma.packagesServices.update({
            where: { id: singlePackageService.id },
            data: { remainingCount: singlePackageService.remainingCount + 1 },
          });
          const service = await this.prisma.service.findUnique({
            where: { id: singlePackageService.serviceId },
            select: { price: true },
          });
          total -= service.price;
          subTotal -= service.price;
        }
      } else {
        const service = await this.prisma.service.findUnique({
          where: { id: serviceId },
          select: { price: true },
        });
        total -= service.price;
        subTotal -= service.price;
      }
    }

    if (
      removePackage &&
      multiPackages.some((pkg) => removePackage.includes(pkg.id))
    ) {
      await this.prisma.clientPackages.updateMany({
        where: {
          id: {
            in: multiPackages
              .filter((pkg) => removePackage.includes(pkg.id))
              .map((pkg) => pkg.id),
          },
          type: 'MULTIPLE',
        },
        data: { isActive: true },
      });
    }

    if (
      addPackage &&
      multiPackages.some((pkg) => addPackage.includes(pkg.id))
    ) {
      await this.prisma.clientPackages.updateMany({
        where: {
          id: {
            in: multiPackages
              .filter((pkg) => addPackage.includes(pkg.id))
              .map((pkg) => pkg.id),
          },
          type: 'MULTIPLE',
        },
        data: { isActive: false },
      });
    }

    const updatedOrder = await this.prisma.order.update({
      where: { id },
      data: {
        ...rest,
        subTotal: total,
        total,
        service: {
          connect: add.map((id) => ({ id })),
          disconnect: remove.map((id) => ({ id })),
        },
        usedPackage: removePackage
          ? [...order.usedPackage, ...addPackage].filter(
              (i) => !removePackage.includes(i),
            )
          : [...order.usedPackage, ...addPackage],
      },
      include: {
        service: true,
      },
    });

    return new AppSuccess(updatedOrder, 'Order updated successfully');
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

    const settings = await this.prisma.settings.findFirst({});

    await this.prisma.user.update({
      where: { id: updatedOrder.userId },
      data: {
        client: {
          update: {
            points: {
              increment:
                updatedOrder.total * (settings[0].PointsPercentage / 100),
            },
          },
        },
      },
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
      this.prisma.barber
        .findUnique({
          where: {
            id: barberId,
          },
          select: {
            Slot: { select: { slot: true } },
          },
        })
        .Slot(),
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

    if (start >= end) {
      throw new ConflictException('Start time must be less than end time.');
    }

    const settings = await this.prisma.settings.findFirst({});

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

  async findOneOrFail(id: string) {
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
