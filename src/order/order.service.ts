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
import {
  BookingStatus,
  Language,
  OrderStatus,
  Prisma,
  PromoCode,
  Role,
  Service,
  User,
} from '@prisma/client';
import { endOfDay, format, startOfDay } from 'date-fns';
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

  async getAllOrdersDateRange(
    user: User,
    language: Language,
    fromDate: Date,
    toDate: Date,
  ) {
    const cashier = await this.prisma.cashier.findUnique({
      where: { id: user.id },
      select: { branchId: true },
    });

    const isAdmin = !cashier;
    const branchFilter = isAdmin
      ? {}
      : ({ id: cashier.branchId } as Prisma.BranchWhereInput);

    const branches = await this.prisma.branch.findMany({
      where: branchFilter,
      include: {
        _count: {
          select: {
            Order: {
              where: {
                date: {
                  gte: fromDate,
                  lte: toDate,
                },
              },
            },
          },
        },
        Translation: true,
        Order: {
          where: {
            date: {
              gte: isAdmin ? fromDate : startOfDay(new Date()),
              lte: isAdmin ? toDate : endOfDay(new Date()),
            },
          },
          include: {
            branch: {
              include: {
                Translation: true,
              },
            },
            barber: {
              include: {
                barber: {
                  include: {
                    user: true,
                  },
                },
              },
            },
            client: true,
            service: {
              include: {
                Translation: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    const formattedOrders = branches.map((branch) => ({
      id: branch.id,
      nameEN: branch.Translation.find((t) => t.language === 'EN')?.name,
      nameAR: branch.Translation.find((t) => t.language === 'AR')?.name,
      name: branch.Translation.find((t) => t.language === language)?.name,
      orders: branch.Order.map((order) => {
        const {
          id,
          barber,
          date,
          client,
          promoCode,
          total,
          slot,
          booking,
          status,
          subTotal,
          type,
          discount,
        } = order;

        return {
          id,
          date: format(new Date(date), 'yyyy-MM-dd'),
          ...(barber && {
            barberId: barber.id,
            barberName: `${barber.barber.user.firstName} ${barber.barber.user.lastName}`,
          }),
          clientId: client?.id,
          ...(client?.id && {
            clientName: `${client?.firstName} ${client?.lastName}`,
          }),
          promoCode,
          subTotal,
          discount,
          discountType: type,
          total,
          slot,
          booking,
          status,
        };
      }),
      orderCount: branch._count.Order,
    }));

    return new AppSuccess(formattedOrders, 'Orders fetched successfully');
  }

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

  async billOrders(from: Date, to: Date) {
    const order = await this.prisma.order.findMany({
      where: {
        status: 'PAID',
        date: {
          gte: startOfDay(from),
          lte: endOfDay(to),
        },
      },
      select: {
        id: true,
        total: true,
        type: true,
        subTotal: true,
        discount: true,
        freeService: true,
        date: true,
        slot: true,
        client: true,
        points: true,
        service: {
          select: {
            id: true,
            Translation: { where: { language: 'EN' }, select: { name: true } },
            price: true,
          },
        },
        Cashier: { select: { firstName: true, lastName: true } },
        barber: { select: { firstName: true, lastName: true } },
        branch: {
          select: {
            Translation: { where: { language: 'EN' }, select: { name: true } },
          },
        },
      },
    });

    const orders = order.map((order) => {
      const {
        service,
        branch,
        date,
        slot,
        barber: { firstName: barberFirstName, lastName: barberLastName },
        Cashier: { firstName: cashierFirstName, lastName: cashierLastName },
        client,
        total,
        type,
        subTotal,
        discount,
        freeService,
        ...rest
      } = order;
      return {
        ...rest,
        total: total.toString(),
        subTotal: subTotal.toString(),
        discount: `${discount.toString()} ${type === 'AMOUNT' ? 'EGP' : '%'}`,
        service: service.map((service) => ({
          name: service.Translation[0].name,
          price: freeService.includes(service.id)
            ? '0'
            : service.price.toString(),
        })),
        branch: branch.Translation[0].name,
        barberName: `${barberFirstName} ${barberLastName}`,
        cashierName: `${cashierFirstName} ${cashierLastName}`,
        clientName: `${client?.firstName} ${client?.lastName}`,
        day: format(new Date(date), 'EEEE'),
        time: slot,
      };
    });

    return new AppSuccess({ orders }, 'Orders fetched successfully');
  }

  async getCashierOrders(id: string, lang: Language, from: Date, to: Date) {
    const cashier = await this.prisma.cashier.findUnique({
      where: { id },
    });
    if (!cashier) throw new NotFoundException('Cashier not found');

    const fetchedOrders = await this.prisma.order.findMany({
      where: {
        branchId: cashier.branchId,
        NOT: {
          status: {
            in: [
              OrderStatus.ADMIN_CANCELLED,
              OrderStatus.CLIENT_CANCELLED,
              OrderStatus.BARBER_CANCELLED,
              OrderStatus.CASHIER_CANCELLED,
              OrderStatus.PAID,
            ],
          },
        },
        date: { gte: startOfDay(from), lte: endOfDay(to) },
      },
      include: {
        barber: { include: { barber: { include: { user: true } } } },
        client: true,
        service: {
          include: {
            Translation: { where: { language: lang } },
          },
        },
      },
    });
    console.log(fetchedOrders);

    const TotalSales = await this.prisma.order.aggregate({
      where: {
        date: { gte: startOfDay(from), lte: endOfDay(to) },
        status: OrderStatus.PAID,
      },
      _sum: {
        total: true,
      },
    });

    const orders = await Promise.all(
      fetchedOrders.map(async (order) => {
        const {
          barber,
          date,
          total,
          subTotal,
          points,
          service,
          id,
          promoCode,
          slot,
          usedPackage,
          client,
          status,
          barberName,
        } = order;

        const usedPackages = await this.prisma.clientPackages.findMany({
          where: { id: { in: usedPackage } },
        });

        const usedPackageIds = usedPackages.flatMap((u) => u.packageId);

        const packageServices = await this.prisma.packages.findMany({
          where: { id: { in: usedPackageIds } },
          include: {
            services: {
              include: {
                Translation: { where: { language: lang } },
              },
            },
          },
        });

        const allServices = [
          ...service,
          ...packageServices.flatMap((p) =>
            p.services.map((s) => ({
              ...s,
              name: s.Translation[0].name,
              price: s.price.toString(),
            })),
          ),
        ];

        const duration = (
          allServices.reduce((total, service) => total + service.duration, 0) +
          15
        ).toString();

        const services = service.map((s) => {
          const { Translation, ...rest } = s;
          return {
            ...rest,
            nameEN: Translation.find((t) => t.language === 'EN')?.name,
            nameAR: Translation.find((t) => t.language === 'AR')?.name,
            name: Translation.find((t) => t.language === lang)?.name,
          };
        });

        return {
          id,
          promoCode,
          slot,
          date: format(new Date(date), 'yyyy-MM-dd'),
          status,
          duration: `${duration} ${lang === 'EN' ? 'Minutes' : 'دقيقة'}`,
          barberUserName: barber
            ? `${barber.barber.user.firstName} ${barber.barber.user.lastName}`
            : (barberName ?? ''),
          barberAvatar: barber ? barber.barber.user.avatar : null,
          userName: `${client?.firstName}${client?.lastName}`,
          userPhone: client?.phone,
          total: total.toString(),
          subTotal: subTotal.toString(),
          discount: (total - subTotal).toString(),
          points: points.toString(),
          usedPackage: packageServices,
          service: services,
        };
      }),
    );

    return new AppSuccess(
      { orders, TotalSales: TotalSales._sum.total || 0 },
      'Orders fetched successfully',
    );
  }

  async getAllOrders(userId: string, lang: Language) {
    const fetchedOrders = await this.prisma.order.findMany({
      where: {
        userId: userId,
        // deleted: false
      },
      include: {
        barber: { include: { barber: { include: { user: true } } } },
        branch: { include: Translation(false, lang) },
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
          barber: barber?.barber || null,
          total: total.toString(),
          subTotal: subTotal.toString(),
          discount: (total - subTotal).toString(),
          points: points.toString(),
          usedPackage: packageServices,
          service: service.map((s) => {
            const { Translation, ...serviceRest } = s;
            return {
              ...serviceRest,
              nameEN: Translation.find((t) => t.language === 'EN').name,
              nameAR: Translation.find((t) => t.language === 'AR').name,
              name: Translation.find((t) => t.language === lang).name,
            };
          }),
          branch: {
            ...branchRest,
            name: Translation[0].name,
          },
        };
      }),
    );

    const upcoming = orders.filter(
      (order) => order.booking === BookingStatus.UPCOMING,
    );
    const completed = orders.filter(
      (order) => order.booking === BookingStatus.PAST,
    );
    const cancelled = orders.filter(
      (order) => order.booking === BookingStatus.CANCELLED,
    );

    return new AppSuccess(
      { upcoming, completed, cancelled },
      'Orders fetched successfully',
    );
  }

  async getPayedOrders(lang: Language, from: string, to: string) {
    const fetchedOrders = await this.prisma.order.findMany({
      where: {
        date: {
          gte: new Date(from),
          lte: new Date(to),
        },
        status: OrderStatus.COMPLETED,
      },
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
          barber: barber?.barber || null,
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

  async GetBarberOrders(
    barberId: string,
    language: Language,
    orderDate?: Date,
  ) {
    const targetDate = orderDate ? new Date(orderDate) : new Date();

    const startDate = startOfDay(targetDate);
    const endDate = endOfDay(targetDate);

    const fetchedOrders = await this.prisma.order.findMany({
      where: {
        barberId: barberId,
        date: { gte: startDate, lte: endDate },
        OR: [
          { status: OrderStatus.PENDING },
          { status: OrderStatus.IN_PROGRESS },
          { booking: BookingStatus.UPCOMING },
        ],
      },
      include: {
        barber: { include: { barber: { include: { user: true } } } },
        branch: { include: Translation(false) },
        service: { include: { Translation: true } },
        client: { select: { firstName: true, lastName: true, phone: true } },
      },
    });

    const orders = await Promise.all(
      fetchedOrders.map(async (order) => {
        const {
          barber,
          date,
          total,
          subTotal,
          points,
          service,
          branch: { Translation, ...branchRest },
          booking,
          client,
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
          barber: barber?.barber || null,
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
          userName: `${client?.firstName}${client?.lastName}`,
          userPhone: client?.phone,
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
    if (points && points <= 0) {
      throw new BadRequestException('You have exceeded the points limit');
    }
    const dateWithoutTime = date.toString().split('T')[0];
    const allServices = [] as PrismaServiceType[];

    const another =
      phone &&
      phone !== '' &&
      (await this.prisma.user.findUnique({ where: { phone } }));
    userId = another ? another.id : userId;

    // Fetch services early to calculate total duration
    const FetchedServices = await this.prisma.service.findMany({
      where: { id: { in: service } },
    });

    // Calculate total duration in minutes for slot validation
    const totalDuration = FetchedServices.reduce(
      (acc, service) => acc + service.duration,
      0,
    );

    const [order, usedPromoCode, slots, validPromoCode, user] =
      await Promise.all([
        await this.prisma.order.findFirst({
          where: {
            ...(barberId && { barberId: barberId }),
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
        barberId
          ? (await this.getSlots(dateWithoutTime, barberId, totalDuration)).data
              .slots
          : [],
        promoCode &&
          (await this.promoCodeService.validatePromoCode(promoCode)).data,

        await this.prisma.user.findUnique({
          where: { id: userId },
          select: {
            client: {
              select: {
                ban: true,
                user: {
                  select: { firstName: true, lastName: true, phone: true },
                },
              },
            },
            role: true,
          },
        }),
      ]);

    if (phone && !user) {
      throw new NotFoundException('User not found');
    }

    const settings = await this.prisma.settings.findFirst({});

    if (points && points <= 0 && settings.pointLimit > points) {
      throw new BadRequestException('You have exceeded the points limit');
    }

    if (usedPromoCode.UserOrders.length && promoCode)
      throw new ConflictException(
        `Promo code "${promoCode}" is invalid or expired.`,
      );

    if (order) throw new ConflictException(`Slot ${slot} is already booked`);

    if (barberId && !slots.includes(slot))
      throw new ServiceUnavailableException(`Slot ${slot} is Unavailable`);

    let costServices = [] as PrismaServiceType[];
    if (user?.role === 'USER') {
      const clientPackages = await this.prisma.clientPackages.findMany({
        where: {
          clientId: userId,
          packageService: {
            some: { isActive: true, remainingCount: { gt: 0 } },
          },
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

      costServices = allServices.filter((service) => !service.isFree);
    }
    if (user?.role !== 'USER') {
      const services = FetchedServices.map((srv) => ({
        ...srv,
        isFree: false,
      }));
      allServices.push(...services);
      costServices = allServices;
    }

    const subTotal = costServices.reduce(
      (acc, service) => acc + service.price,
      0,
    );

    if (points && points > subTotal) {
      throw new BadRequestException('Cannot use points more than the total');
    }

    const discount = promoCode
      ? validPromoCode?.type === 'PERCENTAGE'
        ? (subTotal * validPromoCode?.discount) / 100
        : validPromoCode?.discount
      : 0;

    const total = Math.max(subTotal - discount, 0);

    const duration = allServices.reduce(
      (acc, service) => acc + service.duration,
      0,
    );

    const now = new Date();

    const diffInMs = new Date(dateWithoutTime).getTime() - now.getTime(); // difference in milliseconds
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    if (!settings) {
      throw new NotFoundException('Settings not found');
    }
    if (diffInDays >= settings.maxDaysBooking)
      throw new BadRequestException(
        `You can only book up to ${settings.maxDaysBooking} days in advance`,
      );

    return new AppSuccess(
      {
        date: format(new Date(dateWithoutTime), 'yyyy-MM-dd'),
        slot,
        ...(barberId && { barberId }),
        branchId,
        canUsePoints:
          settings.pointLimit < usedPromoCode?.client?.points ||
          settings.pointLimit > settings.pointLimit + 1,
        points: points?.toString(),
        clientName: `${user?.client?.user?.firstName} ${user?.client?.user?.lastName}`,
        clientPhone: user?.client?.user?.phone,
        createdAt: new Date(),
        updatedAt: null,
        ...(phone && { phone }),
        duration: `${duration} ${lang === 'EN' ? 'Minutes' : 'دقيقة'}`,
        promoCode: promoCode ? promoCode : null,
        subTotal: subTotal?.toString(),
        discount: promoCode
          ? validPromoCode?.type === 'PERCENTAGE'
            ? `${validPromoCode?.discount}%`
            : `${validPromoCode?.discount}EGP`
          : '0',
        total: (points ? total - points : total).toString(),
        limit: settings.pointLimit.toString(),
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
      branchId,
      usedPackage,
      promoCode,
      points,
      phone,
      barberName,
      ...rest
    } = createOrderDto;

    console.log('CreateOrder - barberId received:', barberId);
    if (!Number.isInteger(points)) {
      throw new BadRequestException('Points must be a number');
    }
    if (points && points <= 0) {
      throw new BadRequestException('You have exceeded the points limit');
    }

    const allServices = [] as PrismaServiceType[];
    const dateWithoutTime = createOrderDto.date.toString().split('T')[0];

    const another =
      phone && (await this.prisma.user.findUnique({ where: { phone } }));

    userId = another ? another.id : userId;

    // Fetch services early to calculate total duration
    const FetchedServices = await this.prisma.service.findMany({
      where: { id: { in: service } },
    });

    // Calculate total duration in minutes for slot validation
    const totalDuration = FetchedServices.reduce(
      (acc, service) => acc + service.duration,
      0,
    );

    const [existingOrder, usedPromoCode, slots, validPromoCode, user] =
      await Promise.all([
        await this.prisma.order.findFirst({
          where: {
            ...(barberId && { barberId: barberId }),
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
        barberId
          ? (await this.getSlots(dateWithoutTime, barberId, totalDuration)).data
              .slots
          : [],
        promoCode &&
          (await this.promoCodeService.validatePromoCode(promoCode)).data,
        await this.prisma.user.findUnique({
          where: { id: userId },
          select: {
            client: { select: { points: true, ban: true } },
            role: true,
          },
        }),
      ]);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user?.client?.ban) {
      throw new BadRequestException('You are banned');
    }

    const settings = await this.prisma.settings.findFirst({});
    const now = new Date();

    const diffInMs = new Date(dateWithoutTime).getTime() - now.getTime(); // difference in milliseconds
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    console.log(diffInDays, settings.maxDaysBooking);
    if (!settings) {
      throw new NotFoundException('Settings not found');
    }
    if (diffInDays > settings.maxDaysBooking) {
      throw new ConflictException(
        `You can only book up to ${settings.maxDaysBooking} days in advance`,
      );
    }
    if (points && points >= 0 && settings.pointLimit > points) {
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

    if (barberId && !slots.includes(slot)) {
      throw new ServiceUnavailableException(`Slot ${slot} is Unavailable`);
    }

    const barber = barberId
      ? await this.prisma.barber.findUnique({
          where: { id: barberId },
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        })
      : null;

    console.log('barber', barber);
    console.log('barberName from DTO:', barberName);
    console.log(
      'Generated barberName:',
      barberName || `${barber?.user.firstName} ${barber?.user.lastName}`,
    );

    const branch = await this.prisma.branch.findUnique({
      where: { id: branchId },
    });
    const Services = await this.prisma.service.findMany({
      where: { id: { in: service } },
    });

    if (barberId && !barber) throw new NotFoundException('Barber not found');
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

    if (points && points > subTotal) {
      throw new BadRequestException('Cannot use points more than the total');
    }

    const PointsLimit = allServices.sort((a, b) => a.price - b.price)[0].price;

    const point = points >= PointsLimit ? points : 0;

    if (points > user.client?.points)
      new ConflictException('you do not have enough points');

    if (PointsLimit > points)
      new ConflictException(
        'the number of Points must be at least equal to the lowest price of the services',
      );

    const discount = promoCode
      ? validPromoCode?.type === 'PERCENTAGE'
        ? (subTotal * validPromoCode?.discount) / 100
        : validPromoCode?.discount
      : 0;

    const total = Math.max(subTotal - discount, 0);

    if (user?.client?.ban) throw new ForbiddenException('You are banned');

    let order;

    if (user.role === 'USER') {
      order = await this.prisma.order.create({
        data: {
          ...rest,
          ...(validPromoCode && { promoCode }),
          slot,
          userId,
          ...(barberId && { barberId }),
          barberName: `${barber?.user.firstName} ${barber?.user.lastName}`,
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
          total: points ? total - points : total,
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
      if (points || points > 0) {
        await this.prisma.user.update({
          where: { id: userId },
          data: {
            client: {
              update: {
                points: {
                  decrement: points,
                },
              },
            },
          },
        });
      }
    } else {
      order = await this.prisma.order.create({
        data: {
          ...rest,
          ...(validPromoCode && { promoCode }),
          slot,
          userId,
          barberId,
          barberName:
            barberName || `${barber?.user.firstName} ${barber?.user.lastName}`,
          branchId,
          points: point,
          discount: validPromoCode ? validPromoCode.discount : 0,
          type: validPromoCode ? validPromoCode.type : 'AMOUNT',
          usedPackage: selectedPackage
            ? selectedPackage.flatMap((e) => e.id)
            : [],
          freeService: allServices.filter((s) => s.isFree).flatMap((s) => s.id),
          date: new Date(dateWithoutTime),
          service: {
            connect: allServices.map((service) => ({ id: service.id })),
          },
          subTotal,
          total: points ? total - points : total,
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
    }

    console.log('Order created with barberId:', order.barberId);
    console.log('Order created with barberName:', order.barberName);

    const duration = allServices.reduce(
      (acc, service) => acc + service.duration,
      0,
    );

    return new AppSuccess(
      {
        date: format(order.date, 'yyyy-MM-dd'),
        slot: order.slot,
        ...(barberId && { barberId: order.barberId }),
        branchId: order.branchId,
        barberName: order.barberName,
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
        } else {
          const service = await this.prisma.service.findUnique({
            where: { id: serviceId },
            select: { price: true },
          });
          total += service.price;
        }
      } else {
        const service = await this.prisma.service.findUnique({
          where: { id: serviceId },
          select: { price: true },
        });
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
        }
      } else {
        const service = await this.prisma.service.findUnique({
          where: { id: serviceId },
          select: { price: true },
        });
        total -= service.price;
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
        subTotal: order.subTotal,
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

  async cancelOrder(id: string, role: Role) {
    this.findOneOrFail(id);
    const settings = await this.prisma.settings.findFirst({
      select: {
        canceledOrder: true,
      },
    });
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
      data: {
        booking: BookingStatus.CANCELLED,
        ...(role === Role.ADMIN && { status: OrderStatus.ADMIN_CANCELLED }),
        ...(role === Role.USER && { status: OrderStatus.CLIENT_CANCELLED }),
        ...(role === Role.BARBER && { status: OrderStatus.BARBER_CANCELLED }),
        ...(role === Role.CASHIER && { status: OrderStatus.CASHIER_CANCELLED }),
      },
    });
    if (updatedOrder.points && updatedOrder.points > 0) {
      // Only update client points if the user has a client record
      const client = await this.prisma.client.findUnique({
        where: { id: updatedOrder.userId },
      });

      if (client) {
        await this.prisma.client.update({
          where: { id: updatedOrder.userId },
          data: {
            points: {
              increment: updatedOrder.points,
            },
          },
        });
      }
    }

    if (
      updatedOrder.status === OrderStatus.IN_PROGRESS ||
      updatedOrder.status === OrderStatus.COMPLETED ||
      updatedOrder.status === OrderStatus.PAID
    ) {
      throw new ConflictException(
        'Order cannot be cancelled, it has already started or completed.',
      );
    }

    const packageServiceIds = updatedOrder.service.flatMap((s) =>
      s.PackagesServices.map((ps) => ps.id),
    );

    await this.prisma.$transaction(async (prisma) => {
      if (packageServiceIds.length >= 1) {
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

      // Only update client records if the user has a client role
      const client = await prisma.client.findUnique({
        where: { id: updatedOrder.userId },
      });

      if (client) {
        const updatedClient = await prisma.client.update({
          where: { id: updatedOrder.userId },
          data: {
            canceledOrders: {
              increment: 1,
            },
          },
        });

        if (updatedClient.canceledOrders >= settings?.canceledOrder) {
          await prisma.client.update({
            where: { id: updatedOrder.userId },
            data: {
              ban: true,
            },
          });
        }
      }
    });

    return new AppSuccess(updatedOrder, 'Order cancelled successfully');
  }

  async startOrder(id: string) {
    await this.findOneOrFail(id);

    const updatedOrder = await this.prisma.order.update({
      where: { id },
      data: {
        status: OrderStatus.IN_PROGRESS,
        booking: BookingStatus.UPCOMING,
      },
    });

    return new AppSuccess(updatedOrder, 'Order started successfully');
  }

  async completeOrder(id: string) {
    await this.findOneOrFail(id);

    await this.prisma.$transaction(async (prisma) => {
      const updatedOrder = await this.prisma.order.update({
        where: { id },
        data: { status: OrderStatus.COMPLETED, booking: BookingStatus.PAST },
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
      if (packageServiceIds.length > 0 && updatedOrder.userId) {
        await this.prisma.packagesServices.deleteMany({
          where: {
            id: { in: packageServiceIds },
            ClientPackages: {
              clientId: updatedOrder?.userId,
            },
            remainingCount: { lt: 1 },
          },
        });
      }

      if (updatedOrder.usedPackage && updatedOrder.userId) {
        await prisma.clientPackages.deleteMany({
          where: {
            id: { in: updatedOrder?.usedPackage },
            clientId: updatedOrder?.userId,
          },
        });
      }
      return new AppSuccess(
        updatedOrder,
        'Order completed successfully, used services removed.',
      );
    });
  }

  async paidOrder(id: string, user: User, body?: { discount?: number }) {
    const currentOrder = await this.prisma.order.findUnique({
      where: {
        id,
        NOT: {
          OR: [
            { status: OrderStatus.PAID },
            {
              status: {
                in: [
                  OrderStatus.ADMIN_CANCELLED,
                  OrderStatus.CLIENT_CANCELLED,
                  OrderStatus.BARBER_CANCELLED,
                  OrderStatus.CASHIER_CANCELLED,
                ],
              },
            },
          ],
        },
      },
      select: { subTotal: true, total: true },
    });
    if (!currentOrder) {
      throw new ConflictException('Order is either PAID or cancelleded');
    }
    let code: PromoCode;
    if (body && body.discount) {
      code = await this.promoCodeService
        .createPromoCode({
          code: undefined,
          discount: body.discount,
          type: 'AMOUNT',
          expiredAt: new Date(Date.now() + 60 * 1000), // 1 minute from now
        })
        .then((res) => res.data);
    }
    await this.findOneOrFail(id);

    const updatedOrder = await this.prisma.order.update({
      where: { id },
      data: {
        status: OrderStatus.PAID,
        booking: 'PAST',
        ...(user.role === 'CASHIER' && { cashierId: user.id }),
        ...(code && {
          promoCode: code.code,
          discount: code.discount,
          type: 'AMOUNT',
          subTotal: currentOrder.subTotal,
          total: currentOrder.total - code.discount,
        }),
      },
      include: {
        service: true,
        barber: { select: { firstName: true, lastName: true } },
        branch: { include: {} },
      },
    });

    return new AppSuccess(updatedOrder, 'Order marked as paid');
  }

  async getSlots(date: string, barberId?: string, totalDuration?: number) {
    const dateWithoutTime = date.split('T')[0];
    const startOfDay = new Date(dateWithoutTime);
    const endOfDay = new Date(dateWithoutTime);

    startOfDay.setUTCHours(0, 0, 0, 0);
    endOfDay.setUTCHours(23, 59, 59, 999);

    // If no barberId provided, return empty slots
    if (!barberId) {
      return new AppSuccess({ slots: [] }, 'No barber specified');
    }

    const barber = await this.prisma.barber.findUnique({
      where: {
        id: barberId,
        OR: [
          {
            NOT: {
              vacations: {
                some: {
                  dates: {
                    hasSome: [new Date(dateWithoutTime)],
                  },
                },
              },
            },
          },
        ],
      },
    });
    if (!barber) {
      return new AppSuccess({ slots: [] }, 'Barber not available on this date');
    }

    const [orders, allSlotsData, settings] = await Promise.all([
      this.prisma.order.findMany({
        where: {
          barberId,
          date: {
            gte: startOfDay,
            lte: endOfDay,
          },
          // Include all orders that occupy time slots (not cancelled)
          AND: [
            {
              booking: {
                in: [BookingStatus.UPCOMING],
              },
            },
            {
              status: {
                notIn: [
                  OrderStatus.ADMIN_CANCELLED,
                  OrderStatus.CLIENT_CANCELLED,
                  OrderStatus.BARBER_CANCELLED,
                  OrderStatus.CASHIER_CANCELLED,
                ],
              },
            },
          ],
        },
        select: {
          id: true,
          date: true,
          slot: true,
          booking: true,
          status: true,
          service: { select: { duration: true } },
        },
      }),
      this.prisma.barber.findUnique({
        where: {
          id: barberId,
        },
        select: {
          Slot: {
            select: { slot: true, updatedSlot: true, effectiveSlotDate: true },
          },
        },
      }),

      this.prisma.settings.findFirst({
        select: { slotDuration: true },
      }),
    ]);

    if (!allSlotsData) {
      throw new ConflictException('No slots found in the database.');
    }

    if (!allSlotsData.Slot) {
      return new AppSuccess(
        { slots: [] },
        'No slots configured for this barber',
      );
    }

    const today = new Date().toISOString().split('T')[0];
    const { effectiveSlotDate, updatedSlot, slot } = allSlotsData.Slot;

    const effectiveSlotDateWithoutTime = effectiveSlotDate
      ? effectiveSlotDate?.toISOString().split('T')[0]
      : null;

    let allSlots: string[] = slot || [];

    // Check if barber has any slots at all
    if (!slot || slot.length === 0) {
      return new AppSuccess(
        { slots: [] },
        'No working hours configured for this barber',
      );
    }

    if (
      effectiveSlotDateWithoutTime &&
      dateWithoutTime >= effectiveSlotDateWithoutTime &&
      updatedSlot &&
      updatedSlot.length > 0
    ) {
      allSlots = updatedSlot;
    }

    if (effectiveSlotDateWithoutTime && today >= effectiveSlotDateWithoutTime) {
      // Only update if updatedSlot is not empty
      if (updatedSlot && updatedSlot.length > 0) {
        const newSlots = await this.prisma.slot.update({
          where: { barberId },
          data: {
            slot: updatedSlot,
            effectiveSlotDate: null,
            updatedSlot: [],
          },
        });
        allSlots = newSlots.slot;
      } else {
        // Just clear the effective date without changing slots
        await this.prisma.slot.update({
          where: { barberId },
          data: {
            effectiveSlotDate: null,
            updatedSlot: [],
          },
        });
      }
    }

    const blockedSlots = [];

    // Get slot duration from settings for proper conversion
    const slotDurationMinutes = settings?.slotDuration || 30;

    for (const order of orders) {
      const startIndex = allSlots.indexOf(order.slot);
      if (startIndex === -1) continue;

      // Calculate total duration in minutes
      const totalDurationMinutes = order.service.reduce(
        (sum, s) => sum + s.duration,
        0,
      );

      // Convert to number of slots needed
      const slotsNeeded = Math.ceil(totalDurationMinutes / slotDurationMinutes);

      // Block all consecutive slots needed for this order
      allSlots
        .slice(startIndex, startIndex + slotsNeeded)
        .forEach((slot) => blockedSlots.push(slot));
    }

    let availableSlots = allSlots.filter(
      (slot) => !blockedSlots.includes(slot),
    );

    // Filter out past slots dynamically based on current time
    const todayDate = new Date().toISOString().split('T')[0];
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();

    // Apply time filtering for today's slots
    if (dateWithoutTime === todayDate) {
      // Get buffer time from settings (outside the filter for performance)
      const bufferMinutes = Math.max(10, (settings?.slotDuration || 15) / 3); // Minimum 10 min or 1/3 of slot duration

      availableSlots = availableSlots.filter((slot) => {
        // Parse slot time (e.g., "10:00 AM" or "02:30 PM")
        const slotTime = this.parseSlotTime(slot);
        if (!slotTime) {
          return true; // Keep slot if parsing fails
        }

        const slotTotalMinutes = slotTime.hour * 60 + slotTime.minute;
        const currentTotalMinutes = currentHour * 60 + currentMinute;
        const isSlotAvailable =
          slotTotalMinutes > currentTotalMinutes + bufferMinutes;

        return isSlotAvailable;
      });
    }

    // Filter slots based on total duration if provided
    if (totalDuration && totalDuration > settings.slotDuration) {
      // Reuse slotDurationMinutes from above
      const durationInSlots = Math.ceil(totalDuration / slotDurationMinutes);

      // Only return slots where barber has consecutive availability
      const validStartSlots = availableSlots.filter((slot) => {
        const startIndex = allSlots.indexOf(slot);
        if (startIndex === -1) return false;

        // Check if we have enough consecutive slots starting from this slot
        for (let i = 0; i < durationInSlots; i++) {
          const requiredSlotIndex = startIndex + i;

          // Check if the required slot index is within bounds
          if (requiredSlotIndex >= allSlots.length) {
            return false; // Not enough slots remaining in the day
          }

          const requiredSlot = allSlots[requiredSlotIndex];
          if (!requiredSlot || !availableSlots.includes(requiredSlot)) {
            return false; // Required slot is not available
          }
        }
        return true;
      });
      // If no barber has enough consecutive time, return empty array
      if (validStartSlots.length === 0) {
        return new AppSuccess(
          { slots: [] },
          `Barber doesn't have ${totalDuration} minutes of consecutive time available`,
        );
      }

      availableSlots = validStartSlots;
    }

    console.log('Available slots:', availableSlots);

    return new AppSuccess(
      { slots: availableSlots },
      'Slots fetched successfully',
    );
  }

  private parseSlotTime(slot: string): { hour: number; minute: number } | null {
    try {
      // Parse slots like "10:00 AM", "02:30 PM", etc.
      const timeRegex = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i;
      const match = slot.match(timeRegex);

      if (!match) return null;

      let hour = parseInt(match[1], 10);
      const minute = parseInt(match[2], 10);
      const period = match[3].toUpperCase();

      // Convert to 24-hour format
      if (period === 'AM') {
        if (hour === 12) hour = 0; // 12:00 AM = 00:00
      } else {
        // PM
        if (hour !== 12) hour += 12; // Add 12 for PM (except 12:00 PM)
      }

      return { hour, minute };
    } catch (error) {
      console.error(`Error parsing slot time "${slot}":`, error);
      return null;
    }
  }

  async generateSlot(start: number, end: number) {
    const slotsArray = [];

    const settings = await this.prisma.settings.findFirst({});

    console.log('settings', settings);

    for (let hour = start; hour < end; hour++) {
      for (let minute = 0; minute < 60; minute += settings.slotDuration) {
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
