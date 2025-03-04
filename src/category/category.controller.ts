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
import { Category, Language, User } from '@prisma/client';
import { CreateCategoryDto } from './dto/create-category.dto';
import { AuthGuard } from 'guard/auth.guard';
import { RolesGuard } from '../../guard/role.guard';
import { Roles } from '../../decorators/roles.decorator';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AppSuccess } from 'src/utils/AppSuccess';
import { UserData } from 'decorators/user.decorator';
import { AcceptLanguage } from '../../guard/accept.language';
import { Lang } from 'decorators/accept.language';

@Controller('category')
@UseGuards(RolesGuard)
@UseGuards(AuthGuard)
@UseGuards(AcceptLanguage)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  public async findAllCategories(
    @UserData('user') user: User,
    @Lang() lang: Language,
  ): Promise<AppSuccess<{ categories: Category[]; package: any }>> {
    return await this.categoryService.findAllCategories(user, lang);
  }

  @Get(':id')
  public async findCategoryById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<AppSuccess<Category>> {
    return await this.categoryService.findCategoryById(id);
  }

  @Roles(['ADMIN'])
  @Post()
  public async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<AppSuccess<Category>> {
    return await this.categoryService.createCategory(createCategoryDto);
  }

  @Roles(['ADMIN'])
  @Put(':id')
  public async updateCategory(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<AppSuccess<Category>> {
    return await this.categoryService.updateCategory(id, updateCategoryDto);
  }

  @Roles(['ADMIN'])
  @Put(':id')
  public async deleteCategory(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<AppSuccess<Category>> {
    return await this.categoryService.delete(id);
  }
}
