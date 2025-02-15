import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AppSuccess } from 'src/utils/AppSuccess';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  public async findAllCategories(): Promise<AppSuccess> {
    const categories = await this.prisma.category.findMany({
      include: {
        services: true,
      },
    });

    console.log('categories');

    return new AppSuccess({ categories }, 'Categories found successfully');
  }

  public async findCategoryById(id: string): Promise<AppSuccess> {
    const category = await this.findOneOrFail(id);

    return new AppSuccess(category, 'Category found successfully');
  }

  public async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<AppSuccess> {
    const category = await this.prisma.category.create({
      data: {
        ...createCategoryDto,
      },
    });

    return new AppSuccess(category, 'Category created successfully');
  }

  public async updateCategory(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<AppSuccess> {
    await this.findOneOrFail(id);

    const updatedCategory = await this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
      include: {
        services: true,
      },
    });

    return new AppSuccess(updatedCategory, 'Category updated successfully');
  }

  public async softDeleteCategory(
    id: string,
    available: { available: boolean },
  ): Promise<AppSuccess> {
    await this.findOneOrFail(id);

    const updatedCategory = await this.prisma.category.update({
      where: { id },
      data: {
        available: available.available,
      },
    });

    return new AppSuccess(updatedCategory, 'Category updated successfully');
  }

  private async findOneOrFail(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!category) throw new NotFoundException('Category not found');

    return category;
  }
}
