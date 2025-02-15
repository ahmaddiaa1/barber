import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category, User } from '@prisma/client';
import { CreateCategoryDto } from './dto/create-category.dto';
import { AuthGuard } from 'guard/auth.guard';
import { RolesGuard } from '../../guard/role.guard';
import { Roles } from '../../decorators/roles.decorator';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AppSuccess } from 'src/utils/AppSuccess';
import { UserData } from 'decorators/user.decorator';

@Controller('category')
@UseGuards(RolesGuard)
@UseGuards(AuthGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  public async findAllCategories(
    @UserData('user') user: User,
  ): Promise<AppSuccess> {
    return await this.categoryService.findAllCategories(user);
  }

  @Get(':id')
  public async findCategoryById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<AppSuccess> {
    return await this.categoryService.findCategoryById(id);
  }

  @Roles(['ADMIN'])
  @Post()
  public async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<AppSuccess> {
    return await this.categoryService.createCategory(createCategoryDto);
  }

  @Roles(['ADMIN'])
  @Put(':id')
  public async updateCategory(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<AppSuccess> {
    return await this.categoryService.updateCategory(id, updateCategoryDto);
  }

  @Roles(['ADMIN'])
  @Put(':id/status')
  public async deleteCategory(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() available: { available: boolean },
  ): Promise<AppSuccess> {
    return await this.categoryService.softDeleteCategory(id, available);
  }
}
