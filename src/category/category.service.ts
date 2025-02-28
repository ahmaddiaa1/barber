import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AppSuccess } from 'src/utils/AppSuccess';
import { Category, User } from '@prisma/client';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  public async findAllCategories(
    user: User,
  ): Promise<AppSuccess<{ categories: Category[]; package: any }>> {
    const CurrUser = await this.prisma.user.findUnique({
      where: { id: user.id },
      include: {
        client: {
          include: {
            ClientPackages: {
              where: { isActive: true, type: 'MULTIPLE' },
              include: {
                packageService: {
                  select: {
                    service: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!CurrUser) throw new NotFoundException('User not found');

    const client =
      CurrUser.role === 'USER' &&
      CurrUser.client.ClientPackages.map((item) => {
        const { packageService, clientId, isActive, ...rest } = item;
        return {
          ...rest,
          title: item.title,
          services: packageService?.flatMap((i) => i.service),
        };
      });

    const categories = await this.prisma.category.findMany({
      include: {
        services: true,
      },
    });

    return new AppSuccess(
      { categories, ...(client.length && { package: client }) },
      'Categories found successfully',
    );
  }

  public async findCategoryById(id: string): Promise<AppSuccess<Category>> {
    const category = await this.findOneOrFail(id);

    return new AppSuccess(category, 'Category found successfully');
  }

  public async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<AppSuccess<Category>> {
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
  ): Promise<AppSuccess<Category>> {
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

  public async delete(id: string): Promise<AppSuccess<Category>> {
    await this.findOneOrFail(id);

    const deleteCategory = await this.prisma.category.delete({
      where: { id },
    });

    return new AppSuccess(deleteCategory, 'Category updated successfully');
  }

  private async findOneOrFail(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!category) throw new NotFoundException('Category not found');

    return category;
  }
}
