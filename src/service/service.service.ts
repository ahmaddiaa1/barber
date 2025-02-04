import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Service } from '@prisma/client';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { SupabaseService } from 'src/supabase/supabase.service';
import { AppSuccess } from 'src/utils/AppSuccess';

@Injectable()
export class ServiceService {
  constructor(
    private supabaseService: SupabaseService,
    private readonly prisma: PrismaService,
  ) {}

  public async getAllService(): Promise<AppSuccess> {
    const services = await this.prisma.service.findMany();

    return new AppSuccess(services, 'Services found successfully');
  }

  public async getServiceById(id: string): Promise<AppSuccess> {
    const service = await this.findOneOrFail(id);

    return new AppSuccess(service, 'Service found successfully');
  }

  public async createService(
    createServiceDto: CreateServiceDto,
    file: Express.Multer.File,
  ): Promise<AppSuccess> {
    const generateRandomCode = () => {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let code = '';
      for (let i = 0; i < 20; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters.charAt(randomIndex);
      }
      return code;
    };

    const serviceImg = file
      ? await this.supabaseService.uploadAvatar(file, generateRandomCode())
      : undefined;

    const service = this.prisma.service.create({
      data: { ...createServiceDto, ...(serviceImg && { serviceImg }) },
    });

    return new AppSuccess(service, 'Service created successfully');
  }

  public async updateService(
    id: string,
    updateServiceDto: UpdateServiceDto,
    file: Express.Multer.File,
  ) {
    await this.findOneOrFail(id);
    const serviceImg = file
      ? await this.supabaseService.uploadAvatar(file, id)
      : undefined;
    const service = this.prisma.service.update({
      where: { id },
      data: { ...updateServiceDto, ...(serviceImg && { serviceImg }) },
    });

    return new AppSuccess(service, 'Service updated successfully');
  }

  public async softDeleteService(
    id: string,
    available: { available: boolean },
  ) {
    await this.findOneOrFail(id);
    const service = this.prisma.service.update({
      where: { id },
      data: available,
    });

    return new AppSuccess(service, 'Service deleted successfully');
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
