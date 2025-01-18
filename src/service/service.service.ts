import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Service } from '@prisma/client';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServiceService {
  constructor(private readonly prisma: PrismaService) {}

  public async getAllService(): Promise<Service[]> {
    return this.prisma.service.findMany();
  }

  public async getServiceById(id: string): Promise<Service> {
    return await this.findOneOrFail(id);
  }

  public async createService(
    createServiceDto: CreateServiceDto,
  ): Promise<Service> {
    return this.prisma.service.create({
      data: createServiceDto,
    });
  }

  public async updateService(id: string, updateServiceDto: UpdateServiceDto) {
    await this.findOneOrFail(id);

    return this.prisma.service.update({
      where: { id },
      data: updateServiceDto,
    });
  }

  public async softDeleteService(
    id: string,
    available: { available: boolean },
  ) {
    await this.findOneOrFail(id);

    return this.prisma.service.update({
      where: { id },
      data: available,
    });
  }

  private async findOneOrFail(id: string) {
    const service = await this.prisma.service.findUnique({
      where: { id },
    });

    if (!service) {
      throw new NotFoundException('Service not found');
    }

    return service;
  }
}
