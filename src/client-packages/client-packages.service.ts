import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateClientPackageDto } from './dto/update-client-package.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { AppSuccess } from 'src/utils/AppSuccess';

@Injectable()
export class ClientPackagesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(packageId: string, user: User) {
    const pkg = await this.prisma.packages.findFirst({
      where: { id: packageId },
      include: { services: true },
    });

    if (!pkg) {
      throw new NotFoundException('Package not found');
    }

    const servicesLength = pkg.services.length;

    const clientPackage = await this.prisma.client.update({
      where: { id: user.id },
      data: {
        ClientPackages: {
          create: {
            type: 'SINGLE',
            packageService: {
              createMany: {
                data: pkg.services.map((service) => ({
                  serviceId: service.id,
                  remainingCount: servicesLength,
                })),
              },
            },
          },
        },
      },
      include: {
        ClientPackages: {
          select: {
            id: true,
          },
          include: {
            packageService: {
              include: {
                service: {
                  select: {
                    id: true,
                    name: true,
                    serviceImg: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    // await this.prisma.packagesServices.createMany({
    //   data: pkg.services.map((service) => ({
    //     serviceId: service.id,
    //     ClientPackagesId: clientPackage.id,
    //   })),
    // });
    console.log('clientPackage', clientPackage);
    return new AppSuccess(
      clientPackage,
      'Client package created successfully',
      201,
    );
  }

  async findAll() {
    const clientPackages = await this.prisma.clientPackages.findMany({
      include: {
        packageService: {
          include: {
            service: {
              select: {
                id: true,
                name: true,
                serviceImg: true,
              },
            },
          },
        },
      },
    });

    return new AppSuccess(
      { clientPackages },
      'Client packages fetched successfully',
      200,
    );
  }

  async findOne(id: string) {
    const clientPackage = await this.prisma.clientPackages.findUnique({
      where: { id: id },
      include: {
        packageService: {
          include: {
            service: {
              select: {
                id: true,
                name: true,
                serviceImg: true,
              },
            },
          },
        },
      },
    });

    if (!clientPackage) {
      throw new NotFoundException('Client package not found');
    }

    return new AppSuccess(
      { clientPackage },
      'Client package fetched successfully',
      200,
    );
  }

  update(id: number, updateClientPackageDto: UpdateClientPackageDto) {
    return `This action updates a #${id} clientPackage`;
  }

  async remove(id: string) {
    console.log('id', id);

    await this.prisma.$transaction(async (prisma) => {
      await prisma.packagesServices.deleteMany({
        where: { ClientPackagesId: id },
      });

      await prisma.clientPackages.delete({
        where: { id },
      });

      return 'deleted';
    });
  }
}
