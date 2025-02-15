import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AppSuccess } from 'src/utils/AppSuccess';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class BranchService {
  constructor(
    private prisma: PrismaService,
    private readonly supabaseService: SupabaseService,
  ) {}

  async create(createBranchDto: CreateBranchDto, file: Express.Multer.File) {
    const generateRandomCode = () => {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let code = '';
      for (let i = 0; i < 12; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters.charAt(randomIndex);
      }
      return code;
    };

    const branchImg = file
      ? await this.supabaseService.uploadAvatar(file, generateRandomCode())
      : undefined;

    const newBranch = await this.prisma.branch.create({
      data: {
        ...(branchImg && { branchImg }),
        ...createBranchDto,
      },
    });
    return new AppSuccess(newBranch, 'Branch created successfully');
  }

  async findAll() {
    const branches = await this.prisma.branch.findMany({});
    return new AppSuccess({ branches }, 'Branches found successfully');
  }

  async findOne(id: string) {
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
