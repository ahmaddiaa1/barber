import {
  Body,
  Controller,
  Delete,
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

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @UseGuards(AuthGuard)
  @Get()
  public async findAllCategories(): Promise<Category[]> {
    return await this.categoryService.findAllCategories();
  }

  @Get(':id')
  public async findCategoryById(@Param('id') id: string): Promise<Category> {
    return await this.categoryService.findCategoryById(id);
  }

  @Post()
  public async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return await this.categoryService.createCategory(createCategoryDto);
  }

  @Put(':id')
  public async updateCategory(
    @Param() id: string,
    @Body() updateCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return await this.categoryService.updateCategory(id, updateCategoryDto);
  }

  @Delete(':id')
  public async deleteCategory(id: string): Promise<Category> {
    return await this.categoryService.deleteCategory(id);
  }
}
