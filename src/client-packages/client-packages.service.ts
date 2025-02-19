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

    const clientPackageExists = await this.prisma.clientPackages.findFirst({
      where: { packageId: pkg.id, clientId: user.id },
    });

    if (clientPackageExists) {
      throw new NotFoundException('Client package already exists');
    }

    const servicesLength = pkg.services.length;

    const clientPackage = await this.prisma.client.update({
      where: { id: user.id },
      data: {
        ClientPackages: {
          create: {
            packageId: pkg.id,
            type: 'SINGLE', // replace 'someType' with the appropriate type value
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
