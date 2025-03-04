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
  Res,
} from '@nestjs/common';
import { BranchService } from './branch.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Language } from '@prisma/client';

@UseInterceptors(FileInterceptor('file'))
@Controller('branch')
export class BranchController {
  constructor(private readonly branchService: BranchService) {}

  @Post()
  create(
    @Body() createBranchDto: CreateBranchDto,
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    const lang = res['language'] || Language.EN;
    return this.branchService.create(createBranchDto, file, lang);
  }

  @Get()
  findAll(@Res() res: Response) {
    const lang = res['language'] || Language.EN;
    return this.branchService.findAll(lang);
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
