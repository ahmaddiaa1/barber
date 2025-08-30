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
    const TotalSalesPerStylist = await this.TotalSalesPerStylist(
      fromDate,
      toDate,
    );
    const AnalyticsSummary =
      role === 'CASHIER'
        ? await this.AnalyticsSummary()
        : await this.AnalyticsSummary(fromDate, toDate);
    return new AppSuccess(
      role === 'CASHIER'
        ? { AnalyticsSummary }
        : { TotalSalesPerStylist, AnalyticsSummary },
      'Barber orders with counts fetched successfully',
    );
  }

  private async OrdersSummary() {
    const Branches = await this.prisma.branch.findMany({
      include: {
        Translation: true,
        barber: {
          include: {
            user: {
              include: {
                BarberOrders: {
                  include: { service: { include: { Translation: true } } },
                },
                _count: { select: { BarberOrders: true } },
              },
            },
          },
        },
      },
    });

    // For each barber, fetch orders and count
    const result = await Promise.all(
      Branches.map(async (branch) => {
        const orders = await this.prisma.order.count({
          where: { branchId: branch.id },
        });
        const {
          Translation: BranchTranslation,
          id,
          barber: BarberMap,
          ...rest
        } = branch;

        const barber = BarberMap.map((barber) => {
          const {
            user: {
              BarberOrders,
              _count: { BarberOrders: orderCounts },
              ...UserRest
            },
            ...BarberRest
          } = barber;
          const TotalOrdersPrice = BarberOrders.reduce(
            (sum, order) => sum + order.total,
            0,
          );
          const TotalOrdersPoints = BarberOrders.reduce(
            (sum, order) => sum + order.points,
            0,
          );
          const orders = BarberOrders.flatMap((order) => {
            const { id: orderId, service: OrderService, ...OrderRest } = order;

            const service = OrderService.map((service) => {
              const {
                id: serviceId,
                Translation: serviceTranslate,
                ...rest
              } = service;
              return {
                serviceId,
                ...TranslateName({ Translation: serviceTranslate }, 'EN'),
                ...rest,
              };
            });
            return {
              orderId,
              service,
              ...OrderRest,
            };
          });
          return {
            ...BarberRest,
            user: {
              ...UserRest,
              orders: orders,
              orderCounts,
              TotalOrdersPrice,
              TotalOrdersPoints,
            },
          };
        });

        return {
          id,
          ...TranslateName({ Translation: BranchTranslation }, 'EN'),
          barber,
          ...rest,
          totalOrders: orders,
        };
      }),
    );
    return result;
  }

  private async AnalyticsSummary(fromDate?: Date, toDate?: Date) {
    const date = new Date();
    const TotalOrders = await this.prisma.order.count({
      where: {
        ...(fromDate && toDate
          ? { date: { gte: fromDate, lte: toDate } }
          : { date: { gte: date, lte: date } }),
      },
    });
    return { TotalOrders };
  }

  private async TotalSalesPerStylist(fromDate?: Date, toDate?: Date) {
    const fetchedBranches = await this.prisma.branch.findMany({
      select: {
        id: true,
        Translation: true,
        barber: {
          select: {
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
                    service: { select: { Translation: true, price: true } },
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
        const servicesSummary: Record<string, number> = {};
        barber.user.BarberOrders.forEach((order) => {
          order.service.forEach((srv) => {
            const name =
              TranslateName({ Translation: srv.Translation }, 'EN')?.name ??
              'Unknown';
            servicesSummary[name] = (servicesSummary[name] || 0) + srv.price;
          });
        });

        return {
          barber: `${barber.user.firstName} ${barber.user.lastName}`,
          orderNum: barber.user._count.BarberOrders,
          total: Object.values(servicesSummary).reduce((a, b) => a + b, 0),
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
      include: { Translation: true },
    });

    const result = await Promise.all(
      branches.map(async (branch) => {
        const services = await Promise.all(
          allServices.map(async (service) => {
            // Count orders in this branch that include this service
            const usageCount = await this.prisma.order.count({
              where: {
                branchId: branch.id,
                service: {
                  some: { id: service.id },
                },
              },
            });

            return {
              serviceId: service.id,
              ...TranslateName({ Translation: service.Translation }, 'EN'),
              usageCount,
            };
          }),
        );

        return {
          branchId: branch.id,
          ...TranslateName({ Translation: branch.Translation }, 'EN'),
          services: services.sort((a, b) => b.usageCount - a.usageCount),
        };
      }),
    );

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
