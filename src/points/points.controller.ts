import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PointsService } from './points.service';
import { CreatePointDto } from './dto/create-point.dto';
import { UpdatePointDto } from './dto/update-point.dto';
import { UserData } from 'decorators/user.decorator';
import { User } from '@prisma/client';
import { AuthGuard } from 'guard/auth.guard';

@UseGuards(AuthGuard)
@Controller('points')
export class PointsController {
  constructor(private readonly pointsService: PointsService) {}

  @Post()
  create(@Body() createPointDto: CreatePointDto) {
    return this.pointsService.create(createPointDto);
  }

  @Get()
  findAll() {
    return this.pointsService.findAll();
  }

  @Post('/purchase/:pointId')
  purchasePoint(
    @UserData('user') user: User,
    @Param('pointId') pointId: string,
  ) {
    return this.pointsService.purchasePoint(user, pointId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pointsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePointDto: UpdatePointDto) {
    return this.pointsService.update(+id, updatePointDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pointsService.remove(+id);
  }
}
