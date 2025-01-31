import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ServiceService } from './service.service';
import { Service } from '@prisma/client';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Get()
  public async findAllService(): Promise<Service[]> {
    return await this.serviceService.getAllService();
  }

  @Get(':id')
  public async findServiceById(@Param('id', ParseUUIDPipe) id: string) {
    return await this.serviceService.getServiceById(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  public async createService(
    @Body() createServiceDto: CreateServiceDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.serviceService.createService(createServiceDto, file);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('file'))
  public async updateService(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateServiceDto: UpdateServiceDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.serviceService.updateService(id, updateServiceDto, file);
  }

  @Put(':id/status')
  public async softDeleteService(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() available: { available: boolean },
  ) {
    return await this.serviceService.softDeleteService(id, available);
  }
}
