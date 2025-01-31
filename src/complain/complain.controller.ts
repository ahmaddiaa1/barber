import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ComplainService } from './complain.service';
import { CreateComplainDto } from './dto/create-complain.dto';
import { UserData } from 'decorators/user.decorator';
import { User } from '@prisma/client';
import { AuthGuard } from 'guard/auth.guard';
import { RolesGuard } from 'guard/role.guard';
import { Roles } from 'decorators/roles.decorator';

@Controller('complain')
@UseGuards(AuthGuard)
@UseGuards(RolesGuard)
export class ComplainController {
  constructor(private readonly complainService: ComplainService) {}

  @Post()
  @Roles(['USER'])
  create(
    @Body() createComplainDto: CreateComplainDto,
    @UserData('user') user: User,
  ) {
    return this.complainService.createComplain(createComplainDto, user);
  }

  @Get()
  @Roles(['ADMIN'])
  findAll() {
    return this.complainService.getAllComplains();
  }

  @Get(':id')
  @Roles(['ADMIN'])
  findOne(@Param('id') id: string) {
    return this.complainService.findOne(id);
  }

  @Delete(':id')
  @Roles(['ADMIN'])
  remove(@Param('id') id: string) {
    return this.complainService.remove(id);
  }
}
