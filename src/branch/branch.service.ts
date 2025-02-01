import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AppSuccess } from 'src/utils/AppSuccess';

@Injectable()
export class BranchService {
  constructor(private prisma: PrismaService) {}

  async create(createBranchDto: CreateBranchDto) {
    const newBranch = await this.prisma.branch.create({
      data: {
        branchImg:
          'https://nvdxwkkypzjhvicgdbxs.supabase.co/storage/v1/object/public/avatars/defult-avatar.png',
        ...createBranchDto,
      },
    });
    return new AppSuccess(newBranch, 'Branch created successfully');
  }

  async findAll() {
    const branches = await this.prisma.branch.findMany({
      include: {
        barber: {
          include: {
            user: {
              select: {
                id: false,
                firstName: true,
                lastName: true,
                phone: true,
              },
            },
          },
        },
      },
    });
    return new AppSuccess({ branches }, 'Branches found successfully');
  }

  async findOne(id: string) {
    const branch = await this.prisma.branch.findUnique({
      where: { id },
      include: {
        barber: true,
        Cashier: true,
      },
    });

    if (!branch) throw new NotFoundException('Branch not found');

    return new AppSuccess(branch, 'Branch found successfully');
  }

  async update(id: string, updateBranchDto: UpdateBranchDto) {
    const isBranchExist = await this.prisma.branch.findUnique({
      where: { id },
    });
    if (!isBranchExist) throw new NotFoundException('Branch not found');

    const updatedBranch = await this.prisma.branch.update({
      where: { id },
      data: updateBranchDto,
    });
    return new AppSuccess(updatedBranch, 'Branch updated successfully');
  }

  async remove(id: string) {
    return `This action removes a #${id} branch`;
  }
}
