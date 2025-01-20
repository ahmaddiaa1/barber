import { Injectable } from '@nestjs/common';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { PrismaService } from 'src/prisma/prisma.service';

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
    return newBranch;
  }

  findAll() {
    const branches = this.prisma.branch.findMany();
    return branches;
  }

  findOne(id: string) {
    const branch = this.prisma.branch.findUnique({
      where: { id },
    });
    return branch;
  }

  update(id: number, updateBranchDto: UpdateBranchDto) {
    return `This action updates a #${id} branch`;
  }

  remove(id: number) {
    return `This action removes a #${id} branch`;
  }
}
