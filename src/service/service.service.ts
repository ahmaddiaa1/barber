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
  Translation as serviceTranslation,
  updateTranslation,
} from '../../src/class-type/translation';

@Injectable()
export class ServiceService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly awsService: AwsService,
  ) {}

  public async getAllService(
    language: Language,
  ): Promise<AppSuccess<{ services: Service[] }>> {
    const fetchedServices = await this.prisma.service.findMany({
      include: serviceTranslation(language),
    });

    const services = fetchedServices.map((service) => {
      const { Translation, ...rest } = service;
      console.log(Translation);

      return {
        ...rest,
        name: Translation[0]?.name,
      };
    });

    return new AppSuccess({ services }, 'Services found successfully');
  }

  public async getServiceById(
    id: string,
    language: Language,
  ): Promise<AppSuccess<Service>> {
    const service = await this.findOneOrFail(id, language);

    return new AppSuccess(service, 'Service found successfully');
  }

  public async createService(
    createServiceDto: CreateServiceDto,
    file: Express.Multer.File,
    language: Language,
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
      include: serviceTranslation(language),
    });

    return new AppSuccess(service, 'Service created successfully');
  }

  public async updateService(
    id: string,
    updateServiceDto: UpdateServiceDto,
    file: Express.Multer.File,
    language: Language,
  ): Promise<AppSuccess<Service>> {
    await this.findOneOrFail(id, language);
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
      include: serviceTranslation(language),
    });

    return new AppSuccess(service, 'Service updated successfully');
  }

  public async softDeleteService(
    id: string,
    available: { available: boolean },
  ): Promise<AppSuccess<Service>> {
    // await this.findOneOrFail(id);
    const service = await this.prisma.service.update({
      where: { id },
      data: available,
    });

    return new AppSuccess(service, 'Service deleted successfully');
  }

  private async findOneOrFail(
    id: string,
    language: Language,
  ): Promise<Service> {
    const fetchedService = await this.prisma.service.findUnique({
      where: { id },
      include: serviceTranslation(language),
    });

    const { Translation, ...rest } = fetchedService;

    const service = {
      ...rest,
      name: Translation[0]?.name,
    };

    if (!service) {
      throw new NotFoundException('Service not found');
    }

    return service;
  }
}
