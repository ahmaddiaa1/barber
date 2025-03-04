import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ServiceService } from './service.service';
import { Language, Service } from '@prisma/client';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AcceptLanguage } from '../../guard/accept.language';
import { Lang } from 'decorators/accept.language';
import { AuthGuard } from 'guard/auth.guard';

@UseGuards(AuthGuard)
@UseGuards(AcceptLanguage)
@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Get()
  public async findAllService(@Lang() lang: Language) {
    return await this.serviceService.getAllService(lang);
  }

  @Get(':id')
  public async findServiceById(
    @Param('id', ParseUUIDPipe) id: string,
    @Lang() language: Language,
  ) {
    return await this.serviceService.getServiceById(id, language);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  public async createService(
    @Body() createServiceDto: CreateServiceDto,
    @UploadedFile() file: Express.Multer.File,
    @Lang() language: Language,
  ) {
    return await this.serviceService.createService(
      createServiceDto,
      file,
      language,
    );
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('file'))
  public async updateService(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateServiceDto: UpdateServiceDto,
    @UploadedFile() file: Express.Multer.File,
    @Lang() language: Language,
  ) {
    return await this.serviceService.updateService(
      id,
      updateServiceDto,
      file,
      language,
    );
  }

  @Put(':id/status')
  public async softDeleteService(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() available: { available: boolean },
  ) {
    return await this.serviceService.softDeleteService(id, available);
  }
}
