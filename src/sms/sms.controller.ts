import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { SmsService } from './sms.service';
import { multerConfig } from 'src/config/multer.config';
import { FileInterceptor } from '@nestjs/platform-express';
import { RegisterDto } from 'src/auth/dto/auth-register-dto';

@Controller('sms')
export class SmsController {
  constructor(private readonly smsService: SmsService) {}

  @UseInterceptors(FileInterceptor('file', multerConfig('avatars')))
  @Post()
  create(
    @Body() body: RegisterDto & { type?: 'register' | 'reset' },
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.smsService.sendOTP(body);
  }

  @UseInterceptors(FileInterceptor('file', multerConfig('avatars')))
  @Post('/verify')
  verifyCode(@Body() body: any, @UploadedFile() file: Express.Multer.File) {
    return this.smsService.verifyCode(body, file);
  }

  @Post('/re-send')
  resendCode(@Body('phone') phone: string, type: 'register' | 'reset') {
    return this.smsService.reSendOTP(phone, type);
  }
}
