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
import { multerConfig } from '../../src/config/multer.config';

import { Lang } from '../../decorators/accept.language';
import { Language } from '@prisma/client';

@UseInterceptors(FileInterceptor('file', multerConfig('branches')))
@Controller('branch')
export class BranchController {
  constructor(private readonly branchService: BranchService) {}

  @Post()
  // @UseInterceptors(FileInterceptor('file', multerConfig('branches')))
  create(
    @Body() createBranchDto: CreateBranchDto,
    @UploadedFile() file: Express.Multer.File,
    @Lang() language: Language,
  ) {
    return this.branchService.create(createBranchDto, file, language);
  }

  @Get()
  findAll(@Lang() language: Language) {
    return this.branchService.findAll(language);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string, @Lang() language: Language) {
    return this.branchService.findOne(id, language);
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
