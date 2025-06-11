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

@Controller('sms')
export class SmsController {
  constructor(private readonly smsService: SmsService) {}

  @Post()
  create(
    @Body()
    { phone, type }: { phone: string; type?: 'register' | 'reset' },
  ) {
    return this.smsService.sendOTP(phone, type);
  }
  @UseInterceptors(FileInterceptor('file', multerConfig('avatars')))
  @Post('/verify')
  verifyCode(@Body() body: any, @UploadedFile() file: Express.Multer.File) {
    return this.smsService.verifyCode(body, file);
  }

  @Post('/resend')
  resendCode(@Body('phone') phone: string, type: 'register' | 'reset') {
    return this.smsService.reSendOTP(phone, type);
  }
}
