import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Language, Service } from '@prisma/client';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { AppSuccess } from 'src/utils/AppSuccess';
import { AwsService } from 'src/aws/aws.service';
import { Random } from 'src/utils/generate';
import {
  createTranslation,
  Translation,
  updateTranslation,
} from 'src/class-type/translation';

@Injectable()
export class ServiceService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly awsService: AwsService,
  ) {}

  public async getAllService(
    language: Language,
  ): Promise<AppSuccess<{ services: Service[] }>> {
    const services = await this.prisma.service.findMany({
      include: {
        Translation: {
          where: { language },
          ...Translation.Translation,
        },
      },
    });

    return new AppSuccess({ services }, 'Services found successfully');
  }

  public async getServiceById(id: string): Promise<AppSuccess<Service>> {
    const service = await this.findOneOrFail(id);

    return new AppSuccess(service, 'Service found successfully');
  }

  public async createService(
    createServiceDto: CreateServiceDto,
    file: Express.Multer.File,
  ): Promise<AppSuccess<Service>> {
    const serviceImg =
      file && (await this.awsService.uploadFile(file, Random(11), 'service'));

    console.log(createServiceDto);

    const service = await this.prisma.service.create({
      data: {
        ...createServiceDto,
        ...(serviceImg && { serviceImg }),
        Translation: createTranslation(createServiceDto),
      },
      include: Translation,
    });

    return new AppSuccess(service, 'Service created successfully');
  }

  public async updateService(
    id: string,
    updateServiceDto: UpdateServiceDto,
    file: Express.Multer.File,
  ): Promise<AppSuccess<Service>> {
    await this.findOneOrFail(id);
    const serviceImg =
      file && (await this.awsService.uploadFile(file, id, 'service'));

    const service = await this.prisma.service.update({
      where: { id },
      data: {
        ...updateServiceDto,
        ...(serviceImg && { serviceImg }),
        ...(updateServiceDto.Translation && {
          Translation: updateTranslation(updateServiceDto),
        }),
      },
      include: Translation,
    });

    return new AppSuccess(service, 'Service updated successfully');
  }

  public async softDeleteService(
    id: string,
    available: { available: boolean },
  ): Promise<AppSuccess<Service>> {
    await this.findOneOrFail(id);
    const service = await this.prisma.service.update({
      where: { id },
      data: available,
    });

    return new AppSuccess(service, 'Service deleted successfully');
  }

  private async findOneOrFail(id: string): Promise<Service> {
    const service = await this.prisma.service.findUnique({
      where: { id },
      include: Translation,
    });

    if (!service) {
      throw new NotFoundException('Service not found');
    }

    return service;
  }
}
