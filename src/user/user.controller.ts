import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  Put,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'guard/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserUpdateDto } from './dto/user-update-dto';
import { UserData } from 'decorators/user.decorator';
import { Role, User } from '@prisma/client';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(
    @Query()
    { role, page, pageSize }: { role?: Role; page: number; pageSize: number },
  ) {
    console.log(role);
    return this.userService.findAllUser(page, pageSize, role);
  }

  @Get('clients')
  findAllClients(
    @Query()
    {
      page,
      pageSize,
      phone,
    }: {
      page: number;
      pageSize: number;
      phone?: string;
    },
  ) {
    return this.userService.findAllClients(page, pageSize, phone);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('file'))
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() user: UserUpdateDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.userService.updateUser(id, user, file);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOneUser(id);
  }

  @Get('current/profile')
  CurrentUser(@UserData('user') user: User) {
    return this.userService.CurrentUser(user);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.removeUser(id);
  }
}
