import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ServiceService } from './service.service';
import { Service } from '@prisma/client';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Get()
  public async findAllService(): Promise<Service[]> {
    return await this.serviceService.getAllService();
  }

  @Get(':id')
  public async findServiceById(@Param('id') id: string): Promise<Service> {
    return await this.serviceService.getServiceById(id);
  }

  @Post()
  public async createService(
    @Body() createServiceDto: CreateServiceDto,
  ): Promise<Service> {
    return await this.serviceService.createService(createServiceDto);
  }

  @Put(':id')
  public async updateService(
    @Param('id') id: string,
    @Body() updateServiceDto: UpdateServiceDto,
  ): Promise<Service> {
    return await this.serviceService.updateService(id, updateServiceDto);
  }

  @Put(':id/status')
  public async softDeleteService(
    @Param('id') id: string,
    @Body() available: { available: boolean },
  ): Promise<Service> {
    return await this.serviceService.softDeleteService(id, available);
  }
}
