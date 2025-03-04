import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AppSuccess } from 'src/utils/AppSuccess';
import { AwsService } from 'src/aws/aws.service';
import { Random } from 'src/utils/generate';
import { Branch, Language } from '@prisma/client';
import {
  createTranslation,
  Translation,
  updateTranslation,
} from '../../src/class-type/translation';

@Injectable()
export class BranchService {
  constructor(
    private prisma: PrismaService,
    private awsService: AwsService,
  ) {}

  async create(
    createBranchDto: CreateBranchDto,
    file: Express.Multer.File,
    language: Language,
  ): Promise<AppSuccess<Branch>> {
    const branchImg = file.path;

    const newBranch = await this.prisma.branch.create({
      data: {
        ...(branchImg && { branchImg }),
        ...createBranchDto,
        Translation: createTranslation(createBranchDto),
      },
      include: Translation(),
    });

    const { Translation: branchTranslation, ...rest } = newBranch;

    const branch = {
      ...rest,
      name: branchTranslation[0].name,
    };

    return new AppSuccess(branch, 'Branch created successfully');
  }

  async findAll(
    language: Language,
  ): Promise<AppSuccess<{ branches: Branch[] }>> {
    const fetchBranches = await this.prisma.branch.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: Translation(language),
    });

    const branches = fetchBranches.map((branch) => {
      const { Translation, ...rest } = branch;
      return {
        ...rest,
        name: Translation[0].name,
      };
    });

    return new AppSuccess({ branches }, 'Branches found successfully');
  }

  async findOne(id: string, language?: Language): Promise<AppSuccess<Branch>> {
    const fetchedBranch = await this.prisma.branch.findUnique({
      where: { id },
      include: {
        ...Translation(language),
        barber: {
          select: {
            id: true,
            rate: true,
            user: {
              select: {
                id: false,
                firstName: true,
                lastName: true,
                phone: true,
                avatar: true,
              },
            },
          },
        },
        Cashier: {
          select: {
            id: true,
            user: {
              select: {
                id: false,
                firstName: true,
                lastName: true,
                phone: true,
                avatar: true,
              },
            },
          },
        },
      },
    });

    if (!fetchedBranch)
      throw new NotFoundException(`Branch with ID ${id} not found`);

    const { Translation: branchTranslation, ...rest } = fetchedBranch;

    const branch = {
      ...rest,
      name: branchTranslation[0].name,
    };

    return new AppSuccess(branch, 'Branch found successfully');
  }

  async update(
    id: string,
    updateBranchDto: UpdateBranchDto,
    file: Express.Multer.File,
  ): Promise<AppSuccess<Branch>> {
    await this.findOne(id);

    const branchImg = file.path;

    const updatedBranch = await this.prisma.branch.update({
      where: { id },
      data: {
        ...updateBranchDto,
        ...(branchImg && { branchImg }),
        ...(updateBranchDto.Translation && {
          Translation: updateTranslation(updateBranchDto),
        }),
      },
    });
    return new AppSuccess(updatedBranch, 'Branch updated successfully');
  }
  async remove(id: string) {
    return `This action removes a #${id} branch`;
  }
}
