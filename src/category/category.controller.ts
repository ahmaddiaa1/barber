import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from '@prisma/client';
import { CreateCategoryDto } from './dto/create-category.dto';
import { AuthGuard } from 'guard/auth.guard';
import { RolesGuard } from '../../guard/role.guard';
import { Roles } from '../../decorators/roles.decoretor';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
@UseGuards(RolesGuard)
@UseGuards(AuthGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  public async findAllCategories(): Promise<Category[]> {
    return await this.categoryService.findAllCategories();
  }

  @Get(':id')
  public async findCategoryById(@Param('id') id: string): Promise<Category> {
    return await this.categoryService.findCategoryById(id);
  }

  @Roles(['ADMIN'])
  @Post()
  public async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return await this.categoryService.createCategory(createCategoryDto);
  }

  @Roles(['ADMIN'])
  @Put(':id')
  public async updateCategory(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    return await this.categoryService.updateCategory(id, updateCategoryDto);
  }

  @Roles(['ADMIN'])
  @Put(':id/status')
  public async deleteCategory(
    @Param('id') id: string,
    @Body() available: { available: boolean },
  ): Promise<Category> {
    return await this.categoryService.softDeleteCategory(id, available);
  }
}
