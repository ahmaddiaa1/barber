import { Controller, Get, Post, Body, Put, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AuthGuard } from 'guard/auth.guard';
import { RolesGuard } from 'guard/role.guard';
import { Roles } from 'decorators/roles.decorator';

@Controller('admin')
@UseGuards(AuthGuard(), RolesGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Roles(['ADMIN'])
  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Roles(['ADMIN'])
  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @Get('/analytics')
  getAnalytics() {
    return this.adminService.getBarberOrdersWithCounts();
  }

  @Roles(['ADMIN'])
  @Put()
  update(@Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(updateAdminDto);
  }
}
