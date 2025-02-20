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

@Injectable()
export class PackageService {
  constructor(
    private prisma: PrismaService,
    private awsService: AwsService,
  ) {}

  async create(createPackageDto: CreatePackageDto, file: Express.Multer.File) {
    const { serviceIds, ...rest } = createPackageDto;

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

    const image =
      file && (await this.awsService.uploadFile(file, Random(10), 'packages'));

    const packages = await this.prisma.packages.create({
      data: {
        ...rest,
        services: { connect: serviceIds.map((id) => ({ id })) },
        ...(image && { image }),
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

  async remove(id: string) {
    await this.prisma.packages.delete({
      where: { id },
    });

    return `This action removes a #${id} package`;
  }
}
