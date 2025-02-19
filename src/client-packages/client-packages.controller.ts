import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ClientPackagesService } from './client-packages.service';
import { CreateClientPackageDto } from './dto/create-client-package.dto';
import { UpdateClientPackageDto } from './dto/update-client-package.dto';
import { UserData } from 'decorators/user.decorator';
import { User } from '@prisma/client';
import { AuthGuard } from 'guard/auth.guard';

@UseGuards(AuthGuard)
@Controller('client-packages')
export class ClientPackagesController {
  constructor(private readonly clientPackagesService: ClientPackagesService) {}
  @Post()
  create(@UserData('user') user: User, @Query('packageId') packageId: string) {
    return this.clientPackagesService.create(packageId, user);
  }

  @Get()
  findAll() {
    return this.clientPackagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientPackagesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateClientPackageDto: UpdateClientPackageDto,
  ) {
    return this.clientPackagesService.update(+id, updateClientPackageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientPackagesService.remove(id);
  }
}
