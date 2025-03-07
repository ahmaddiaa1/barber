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
import { UpdateClientPackageDto } from './dto/update-client-package.dto';
import { UserData } from 'decorators/user.decorator';
import { Language, User } from '@prisma/client';
import { AuthGuard } from 'guard/auth.guard';
import { Lang } from 'decorators/accept.language';

@UseGuards(AuthGuard)
@Controller('client-packages')
export class ClientPackagesController {
  constructor(private readonly clientPackagesService: ClientPackagesService) {}

  @Post()
  create(
    @UserData('user') user: User,
    @Query('packageId') packageId: string,
    @Lang() lang: Language,
  ) {
    return this.clientPackagesService.create(packageId, user, lang);
  }

  @Get()
  findAll(@Lang() language: Language) {
    return this.clientPackagesService.findAll(language);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Lang() language: Language) {
    return this.clientPackagesService.findOne(id, language);
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
