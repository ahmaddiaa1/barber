import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AppSuccess } from 'src/utils/AppSuccess';
import { Category, CategoryType, Language, User } from '@prisma/client';
import {
  createTranslation,
  Translation,
  translationDes,
  updateTranslation,
} from '../../src/class-type/translation';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  public async findAllCategories(
    user: User,
    language: Language,
    type: CategoryType,
  ): Promise<AppSuccess<{ categories: Category[]; package: any }>> {
    let packages;

    if (user) {
      const CurrUser = await this.prisma.user.findUnique({
        where: { id: user?.id },
        include: {
          client: {
            include: {
              ClientPackages: {
                where: { isActive: true, type: 'MULTIPLE' },
                include: {
                  Translation: {
                    where: { language },
                    ...translationDes().Translation,
                  },
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
      packages =
        CurrUser &&
        CurrUser.role === 'USER' &&
        CurrUser.client.ClientPackages.map((item) => {
          const {
            packageService,
            clientId,
            Translation,
            isActive,
            id,
            type,
            createdAt,
            updatedAt,
            description,
          } = item;

          return Translation.map((translate) => ({
            id,
            createdAt,
            updatedAt,
            type,
            name: translate.name,
            description: translate.description,
            services: packageService.flatMap((service) => service.service),
          }));
        }).flat();
    }

    const fetchedCategories = await this.prisma.category.findMany({
      where: { type },
      include: {
        services: {
          include: Translation(),
        },
        ...Translation(),
      },
    });

    const categories = fetchedCategories.map((category) => {
      const { Translation: categoryTranslation, services, ...rest } = category;

      const service = services.map((service) => {
        const { Translation: serviceTranslation, ...rest } = service;
        return {
          ...rest,
          nameEN: serviceTranslation.find((t) => t.language === 'EN')?.name,
          nameAR: serviceTranslation.find((t) => t.language === 'AR')?.name,
          name: serviceTranslation.find((t) => t.language === language)?.name,
        };
      });

      return {
        ...rest,
        nameEN: categoryTranslation.find((t) => t.language === 'EN')?.name,
        nameAR: categoryTranslation.find((t) => t.language === 'AR')?.name,
        name: categoryTranslation.find((t) => t.language === language)?.name,
        services: service,
      };
    });

    return new AppSuccess(
      { categories, ...(packages?.length && { package: packages }) },
      'Categories found successfully',
    );
  }

  public async findCategoryById(
    id: string,
    language: Language,
  ): Promise<AppSuccess<Category>> {
    const category = await this.findOneOrFail(id, language);

    return new AppSuccess(category, 'Category found successfully');
  }

  public async createCategory(
    createCategoryDto: CreateCategoryDto,
    language: Language,
  ): Promise<AppSuccess<Category>> {
    const newCategory = await this.prisma.category.create({
      data: {
        ...createCategoryDto,
        Translation: createTranslation(createCategoryDto),
      },
      include: Translation(false, language),
    });

    const { Translation: categoryTranslation, ...rest } = newCategory;

    const category = {
      ...rest,
      name: categoryTranslation[0].name,
    };

    return new AppSuccess(category, 'Category created successfully');
  }

  public async updateCategory(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
    language: Language,
  ): Promise<AppSuccess<Category>> {
    await this.findOneOrFail(id);

    const updatedCategory = await this.prisma.category.update({
      where: { id },
      data: {
        ...updateCategoryDto,
        Translation: updateTranslation(updateCategoryDto),
      },
      include: Translation(false, language),
    });

    const { Translation: categoryTranslation, ...rest } = updatedCategory;

    const category = {
      ...rest,
      name: categoryTranslation[0].name,
    };

    return new AppSuccess(category, 'Category updated successfully');
  }

  public async delete(id: string): Promise<AppSuccess<Category>> {
    await this.findOneOrFail(id);

    const deleteCategory = await this.prisma.category.delete({
      where: { id },
    });

    return new AppSuccess(deleteCategory, 'Category updated successfully');
  }

  private async findOneOrFail(id: string, language?: Language) {
    const fetchedCategory = await this.prisma.category.findUnique({
      where: { id },
      include: {
        services: {
          include: Translation(false, language),
        },
        ...Translation(false, language),
      },
    });

    const {
      Translation: categoryTranslation,
      services,
      ...rest
    } = fetchedCategory;

    const service = services.map((service) => {
      const { Translation: serviceTranslation, ...rest } = service;
      return {
        ...rest,
        name: serviceTranslation[0].name,
      };
    });

    const category = {
      ...rest,
      services: service,
      name: categoryTranslation[0].name,
    };

    if (!category) throw new NotFoundException('Category not found');

    return category;
  }
}
