import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AppSuccess } from 'src/utils/AppSuccess';
import { TranslateName } from '../../lib/lib';
import { Role } from '@prisma/client';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAdminDto: CreateAdminDto) {
    const settings = await this.prisma.settings.findFirst();
    if (!settings) {
      return this.prisma.settings.create({
        data: createAdminDto,
      });
    }
  }

  async findAll() {
    const settings = await this.prisma.settings.findFirst();

    if (!settings) {
      return new NotFoundException(null, 'Settings not found');
    }

    return new AppSuccess(settings, 'Settings fetched successfully');
  }

  async update(updateAdminDto: UpdateAdminDto) {
    const ExistingSettings = await this.prisma.settings.findFirst();
    if (!ExistingSettings) {
      return new AppSuccess(
        await this.prisma.settings.create({
          data: updateAdminDto,
        }),
        'Settings not found',
      );
    }
    const settings = await this.prisma.settings.update({
      where: { id: ExistingSettings.id },
      data: updateAdminDto,
    });

    if (updateAdminDto.slotDuration) {
      const slots = (await this.prisma.slot.findMany({})).map((slot) => {
        return {
          slot: slot.slot,
          id: slot.id,
          start: slot.start,
          end: slot.end,
        };
      });

      Promise.all([
        slots.map(async (slot) => {
          return this.prisma.slot.update({
            where: { id: slot.id },
            data: {
              slot: await this.generateSlots(
                slot.start,
                slot.end,
                updateAdminDto.slotDuration,
              ),
            },
          });
        }),
      ]);
    }

    return new AppSuccess(settings, 'Settings updated successfully');
  }

  async getBarberOrdersWithCounts(role: Role, fromDate?: Date, toDate?: Date) {
    const TotalOrdersPerDay = await this.AnalyticsSummary();

    switch (role) {
      case Role.CASHIER:
        return new AppSuccess(
          { TotalOrdersPerDay },
          'Cashier orders with counts fetched successfully',
        );

      case Role.ADMIN:
        const today = new Date();
        const oneMonthBefore = new Date();
        oneMonthBefore.setMonth(today.getMonth() - 1);

        const TotalOrdersPerMonth = await this.AnalyticsSummary(
          fromDate ?? oneMonthBefore,
          toDate ?? new Date(),
        );
        const TotalSalesPerBranch = await this.TotalSalesPerBranch(
          fromDate,
          toDate,
        );
        const ServiceUsageSummary = await this.ServiceUsageSummary();

        return new AppSuccess(
          {
            // TotalOrdersPerDay,
            ...TotalOrdersPerMonth,
            TotalSalesPerBranch,
            ServiceUsageSummary,
          },
          'Admin orders with counts fetched successfully',
        );
    }
  }

  // private async OrdersSummary() {
  //   const Branches = await this.prisma.branch.findMany({
  //     include: {
  //       Translation: true,
  //       barber: {
  //         include: {
  //           user: {
  //             include: {
  //               BarberOrders: {
  //                 include: { service: { include: { Translation: true } } },
  //               },
  //               _count: { select: { BarberOrders: true } },
  //             },
  //           },
  //         },
  //       },
  //     },
  //   });

  //   // For each barber, fetch orders and count
  //   const result = await Promise.all(
  //     Branches.map(async (branch) => {
  //       const orders = await this.prisma.order.count({
  //         where: { branchId: branch.id },
  //       });
  //       const {
  //         Translation: BranchTranslation,
  //         id,
  //         barber: BarberMap,
  //         ...rest
  //       } = branch;

  //       const barber = BarberMap.map((barber) => {
  //         const {
  //           user: {
  //             BarberOrders,
  //             _count: { BarberOrders: orderCounts },
  //             ...UserRest
  //           },
  //           ...BarberRest
  //         } = barber;
  //         const TotalOrdersPrice = BarberOrders.reduce(
  //           (sum, order) => sum + order.total,
  //           0,
  //         );
  //         const TotalOrdersPoints = BarberOrders.reduce(
  //           (sum, order) => sum + order.points,
  //           0,
  //         );
  //         const orders = BarberOrders.flatMap((order) => {
  //           const { id: orderId, service: OrderService, ...OrderRest } = order;

  //           const service = OrderService.map((service) => {
  //             const {
  //               id: serviceId,
  //               Translation: serviceTranslate,
  //               ...rest
  //             } = service;
  //             return {
  //               serviceId,
  //               ...TranslateName({ Translation: serviceTranslate }, 'EN'),
  //               ...rest,
  //             };
  //           });
  //           return {
  //             orderId,
  //             service,
  //             ...OrderRest,
  //           };
  //         });
  //         return {
  //           ...BarberRest,
  //           user: {
  //             ...UserRest,
  //             orders: orders,
  //             orderCounts,
  //             TotalOrdersPrice,
  //             TotalOrdersPoints,
  //           },
  //         };
  //       });

  //       return {
  //         id,
  //         ...TranslateName({ Translation: BranchTranslation }, 'EN'),
  //         barber,
  //         ...rest,
  //         totalOrders: orders,
  //       };
  //     }),
  //   );
  //   return result;
  // }

  private async AnalyticsSummary(fromDate?: Date, toDate?: Date) {
    const date = new Date();
    const TotalOrderCount = await this.prisma.order.count({
      where: {
        ...(fromDate && toDate
          ? { date: { gte: fromDate, lte: toDate } }
          : { date: { gte: date, lte: date } }),
      },
    });
    const TotalOrdersPrice = await this.prisma.order.aggregate({
      where: {
        ...(fromDate && toDate
          ? { date: { gte: fromDate, lte: toDate } }
          : { date: { gte: date, lte: date } }),
      },
      _sum: {
        total: true,
      },
    });
    return { TotalOrderCount, TotalSales: TotalOrdersPrice._sum.total || 0 };
  }

  private async TotalSalesPerBranch(fromDate?: Date, toDate?: Date) {
    const fetchedBranches = await this.prisma.branch.findMany({
      select: {
        id: true,
        Translation: true,
        barber: {
          select: {
            id: true,
            user: {
              select: {
                _count: { select: { BarberOrders: true } },
                firstName: true,
                lastName: true,
                phone: true,
                id: true,
                BarberOrders: {
                  where: {
                    ...(fromDate && toDate
                      ? { date: { gte: fromDate, lte: toDate } }
                      : {}),
                  },
                  select: {
                    service: {
                      select: { Translation: true, price: true, id: true },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    const branches = fetchedBranches.map((branch) => {
      const { Translation, barber, id } = branch;
      const result = barber.map((barber) => {
        const servicesSummary: {
          id: string;
          name: string;
          price: number;
          count: number;
        }[] = [];
        barber.user.BarberOrders.forEach((order) => {
          order.service.forEach((srv) => {
            const name =
              TranslateName({ Translation: srv.Translation }, 'EN')?.name ??
              'Unknown';

            // Check if service already exists in summary
            const existing = servicesSummary.find((s) => s.id === srv.id);
            if (existing) {
              existing.price += srv.price; // accumulate price
              existing.count += 1; // increment count
            } else {
              servicesSummary.push({
                id: srv.id,
                name: name,
                price: srv.price,
                count: 1,
              });
            }
          });
        });

        return {
          id: barber.id,
          barber: `${barber.user.firstName} ${barber.user.lastName}`,
          orderCount: barber.user._count.BarberOrders,
          sales: Object.values(servicesSummary).reduce(
            (a, b) => a + b.price,
            0,
          ),
          services: servicesSummary,
        };
      });
      return {
        id,
        ...TranslateName({ Translation }, 'EN'),
        barbers: result,
      };
    });

    return branches;
  }

  private async ServiceUsageSummary() {
    const branches = await this.prisma.branch.findMany({
      include: { Translation: true },
    });

    const allServices = await this.prisma.service.findMany({
      include: { Translation: true, _count: { select: { order: true } } },
      orderBy: { order: { _count: 'desc' } },
    });

    const result = branches.map((branch) => {
      const services = allServices
        .filter((f) => f._count.order)
        .map((service) => {
          return {
            serviceId: service.id,
            ...TranslateName({ Translation: service.Translation }, 'EN'),
            usageCount: service._count.order || 0,
          };
        });

      return {
        branchId: branch.id,
        ...TranslateName({ Translation: branch.Translation }, 'EN'),
        services,
      };
    });

    return result;
  }

  private async generateSlots(start: number, end: number, duration: number) {
    const slotsArray = [];
    for (let time = start * 60; time < end * 60; time += duration) {
      const hour = Math.floor(time / 60);
      const minute = time % 60;
      const formattedHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
      const period = hour >= 12 ? 'PM' : 'AM';
      const slot = `${formattedHour.toString().padStart(2, '0')}:${minute
        .toString()
        .padStart(2, '0')} ${period}`;
      slotsArray.push(slot);
    }
    return slotsArray;
  }
}
