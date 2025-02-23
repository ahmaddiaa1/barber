import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AppSuccess } from 'src/utils/AppSuccess';
import { AwsService } from 'src/aws/aws.service';
import { Random } from 'src/utils/generate';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class PackageService {
  constructor(
    private prisma: PrismaService,
    private awsService: AwsService,
  ) {}

  async create(createPackageDto: CreatePackageDto, file: Express.Multer.File) {
    const { serviceIds, type, count, ...rest } = createPackageDto;

    const existingServiceIds = (
      await this.prisma.service.findMany({
        where: { id: { in: serviceIds } },
        select: { id: true },
      })
    ).map((service) => service.id);

    const invalidServiceIds = serviceIds.filter(
      (serviceId) => !existingServiceIds.includes(serviceId),
    );

    if (invalidServiceIds.length > 0) {
      throw new BadRequestException(
        `Invalid service IDs: ${invalidServiceIds.join(', ')}`,
      );
    }

    if (type === 'MULTIPLE' && count > 1) {
      throw new BadRequestException(
        'Count of services must be 1 for type MULTIPLE',
      );
    }

    const image =
      file && (await this.awsService.uploadFile(file, Random(10), 'packages'));

    const offer = await this.prisma.offers.create({
      data: {
        offerType: 'PACKAGES',
        expiresAt: rest.expiresAt,
      },
    });

    const packages = await this.prisma.offers.update({
      where: { id: offer.id },
      data: {
        packages: {
          create: {
            ...rest,
            type,
            count,
            services: { connect: serviceIds.map((id) => ({ id })) },
            ...(image && { image }),
          },
        },
      },
    });

    return new AppSuccess(packages, 'Package created successfully', 201);
  }

  async findAll() {
    const packages = await this.prisma.packages.findMany({
      include: {
        services: {
          select: {
            id: true,
            name: true,
            serviceImg: true,
          },
        },
      },
    });

    return new AppSuccess({ packages }, 'packages fetched successfully', 200);
  }

  async findOne(id: string) {
    const packageData = await this.prisma.packages.findUnique({
      where: { id },
      include: {
        services: {
          select: {
            id: true,
            name: true,
            serviceImg: true,
          },
        },
      },
    });

    if (!packageData) new NotFoundException('Package not found');

    return new AppSuccess(packageData, 'Package fetched successfully');
  }

  update(id: string, updatePackageDto: UpdatePackageDto) {
    return `This action updates a #${id} package`;
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async removeExpiredPackages() {
    const result = await this.prisma.packages.findMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    });

    if (result.length > 0) {
      await this.prisma.packages.deleteMany({
        where: {
          expiresAt: {
            lt: new Date(),
          },
        },
      });
    }
  }

  async remove() {
    await this.prisma.packages.deleteMany();

    return `This action removes a package`;
  }
}
