import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AppSuccess } from 'src/utils/AppSuccess';
import { TranslateName } from '../../lib/lib';

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

  async getBarberOrdersWithCounts() {
    // Fetch all barbers with their branch info
    const OrdersSummary = await this.OrdersSummary();
    const ServiceUsageSummary = await this.ServiceUsageSummary();
    return new AppSuccess(
      { ServiceUsageSummary },
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
