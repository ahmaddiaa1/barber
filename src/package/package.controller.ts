import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { PackageService } from './package.service';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { AuthGuard } from 'guard/auth.guard';
import { RolesGuard } from 'guard/role.guard';
import { Roles } from 'decorators/roles.decorator';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('package')
@UseGuards(RolesGuard)
@UseGuards(AuthGuard)
export class PackageController {
  constructor(private readonly packageService: PackageService) {}

  @Roles(['ADMIN'])
  @UseInterceptors(FileInterceptor('file'))
  @Post()
  create(
    @Body() createPackageDto: CreatePackageDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.packageService.create(createPackageDto, file);
  }

  @Get()
  findAll() {
    return this.packageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.packageService.findOne(id);
  }

  @Roles(['ADMIN'])
  @Put(':id')
  update(@Param('id') id: string, @Body() updatePackageDto: UpdatePackageDto) {
    return this.packageService.update(id, updatePackageDto);
  }

  @Roles(['ADMIN'])
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.packageService.remove(id);
  }
}
