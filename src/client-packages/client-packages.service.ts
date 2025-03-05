import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateClientPackageDto } from './dto/update-client-package.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Language, User } from '@prisma/client';
import { AppSuccess } from 'src/utils/AppSuccess';
import {
  createTranslation,
  Translation,
  translationDes,
} from '../../src/class-type/translation';

@Injectable()
export class ClientPackagesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(packageId: string, user: User, language: Language) {
    const pkg = await this.prisma.packages.findFirst({
      where: { id: packageId },
      include: { services: true, ...translationDes() },
    });

    if (!pkg) {
      throw new NotFoundException(`Package with ID ${packageId} not found`);
    }

    const clientPackageExists = await this.prisma.clientPackages.findFirst({
      where: { packageId: pkg.id, clientId: user.id },
    });

    if (clientPackageExists) {
      throw new NotFoundException('You already have this package');
    }

    const clientPackage = await this.prisma.client.update({
      where: { id: user.id },
      data: {
        ClientPackages: {
          create: {
            Translation: createTranslation(pkg),
            packageId: pkg.id,
            type: pkg.type,
            packageService: {
              createMany: {
                data: pkg.services.map((service) => ({
                  serviceId: service.id,
                  remainingCount: pkg.count,
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
                  include: Translation(language),
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

  async findAll(language: Language) {
    const fetchedClientPackages = await this.prisma.clientPackages.findMany({
      include: {
        Translation: {
          where: { language },
          ...translationDes().Translation,
        },
        packageService: {
          include: {
            service: {
              include: {
                Translation: {
                  where: { language },
                  ...Translation().Translation,
                },
              },
            },
          },
        },
      },
    });

    const clientPackages = fetchedClientPackages.map((clientPackage) => {
      const { Translation, packageService, ...rest } = clientPackage;
      return {
        ...rest,
        name: Translation[0].name,
        description: Translation[0].description,
        services: packageService.map((service) => {
          const { serviceImg, Translation, ...rest } = service.service;
          return {
            ...rest,
            name: Translation[0].name,
            serviceImg,
          };
        }),
      };
    });

    return new AppSuccess(
      { clientPackages },
      'Client packages fetched successfully',
      200,
    );
  }

  async findOne(id: string, language: Language) {
    const fetchedClientPackage = await this.prisma.clientPackages.findUnique({
      where: { id: id },
      include: {
        Translation: {
          where: { language },
          ...translationDes().Translation,
        },
        packageService: {
          include: {
            service: {
              select: {
                id: true,
                Translation: {
                  where: { language },
                  ...Translation().Translation,
                },
                serviceImg: true,
              },
            },
          },
        },
      },
    });

    const {
      Translation: clientPackageTranslation,
      packageService,
      ...rest
    } = fetchedClientPackage;

    const clientPackage = {
      ...rest,
      name: clientPackageTranslation[0].name,
      description: clientPackageTranslation[0].description,
      services: packageService.map((service) => {
        const { serviceImg, Translation, ...rest } = service.service;
        return {
          ...rest,
          name: Translation[0].name,
          serviceImg,
        };
      }),
    };

    if (!clientPackage) {
      throw new NotFoundException(`Client package with ID ${id} not found`);
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
