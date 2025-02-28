import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AppSuccess } from 'src/utils/AppSuccess';
import { AwsService } from 'src/aws/aws.service';
import { Random } from 'src/utils/generate';
import { Branch } from '@prisma/client';

@Injectable()
export class BranchService {
  constructor(
    private prisma: PrismaService,
    private awsService: AwsService,
  ) {}

  async create(
    createBranchDto: CreateBranchDto,
    file: Express.Multer.File,
  ): Promise<AppSuccess<Branch>> {
    const branchImg =
      file && (await this.awsService.uploadFile(file, Random(10), 'branch'));

    const newBranch = await this.prisma.branch.create({
      data: {
        ...(branchImg && { branchImg }),
        ...createBranchDto,
      },
    });
    return new AppSuccess(newBranch, 'Branch created successfully');
  }

  async findAll(): Promise<AppSuccess<{ branches: Branch[] }>> {
    const branches = await this.prisma.branch.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return new AppSuccess({ branches }, 'Branches found successfully');
  }

  async findOne(id: string): Promise<AppSuccess<Branch>> {
    const branch = await this.prisma.branch.findUnique({
      where: { id },
      include: {
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

    if (!branch) throw new NotFoundException(`Branch with ID ${id} not found`);

    return new AppSuccess(branch, 'Branch found successfully');
  }

  async update(
    id: string,
    updateBranchDto: UpdateBranchDto,
    file: Express.Multer.File,
  ): Promise<AppSuccess<Branch>> {
    await this.findOne(id);

    const branchImg =
      file && (await this.awsService.uploadFile(file, Random(10), 'branch'));

    const updatedBranch = await this.prisma.branch.update({
      where: { id },
      data: {
        ...(branchImg && { branchImg }),
        ...updateBranchDto,
      },
    });
    return new AppSuccess(updatedBranch, 'Branch updated successfully');
  }

  async remove(id: string) {
    return `This action removes a #${id} branch`;
  }
}
