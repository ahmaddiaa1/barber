import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Service } from '@prisma/client';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class ServiceService {
  constructor(
    private supabaseService: SupabaseService,
    private readonly prisma: PrismaService,
  ) {}

  public async getAllService(): Promise<Service[]> {
    return this.prisma.service.findMany();
  }

  public async getServiceById(id: string): Promise<Service> {
    return await this.findOneOrFail(id);
  }

  public async createService(
    createServiceDto: CreateServiceDto,
    file: Express.Multer.File,
  ): Promise<Service> {
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

    return this.prisma.service.create({
      data: { ...createServiceDto, ...(serviceImg && { serviceImg }) },
    });
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
    return this.prisma.service.update({
      where: { id },
      data: { ...updateServiceDto, ...(serviceImg && { serviceImg }) },
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
