import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Category } from '@prisma/client';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  public async findAllCategories(): Promise<Category[]> {
    return this.prisma.category.findMany({
      include: {
        services: true,
      },
    });
  }

  public async findCategoryById(id: string): Promise<Category> {
    return await this.findOneOrFail(id);
  }

  public async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.prisma.category.create({
      data: {
        ...createCategoryDto,
      },
    });
  }

  public async updateCategory(
    id: string,
    updateCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    await this.findOneOrFail(id);

    return this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
    });
  }

  public async deleteCategory(id: string): Promise<Category> {
    await this.findOneOrFail(id);

    return this.prisma.category.delete({
      where: { id },
    });
  }

  private async findOneOrFail(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }
}
