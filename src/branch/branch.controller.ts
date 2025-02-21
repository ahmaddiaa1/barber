import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseUUIDPipe,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { BranchService } from './branch.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@UseInterceptors(FileInterceptor('file'))
@Controller('branch')
export class BranchController {
  constructor(private readonly branchService: BranchService) {}

  @Post()
  create(
    @Body() createBranchDto: CreateBranchDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.branchService.create(createBranchDto, file);
  }

  @Get()
  findAll() {
    return this.branchService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.branchService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateBranchDto: UpdateBranchDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.branchService.update(id, updateBranchDto, file);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.branchService.remove(id);
  }
}
