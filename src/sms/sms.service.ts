import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  Req,
} from '@nestjs/common';
import { CreateSmDto } from './dto/create-sm.dto';
import { UpdateSmDto } from './dto/update-sm.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import axios from 'axios';
import { RegisterDto } from 'src/auth/dto/auth-register-dto';
import { AuthService } from 'src/auth/auth.service';
import e from 'express';
import { Random } from 'src/utils/generate';
import { hash } from 'bcrypt';

@Injectable()
export class SmsService {
  private readonly username: string;
  private readonly password: string;
  private readonly senderName: string;
  private readonly logger = new Logger(SmsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly authService: AuthService, // Assuming you have an AuthService for user-related operations
  ) {
    this.senderName = process.env.SMS_SENDERNAME;
    this.username = process.env.SMS_USERNAME;
    this.password = process.env.SMS_PASSWORD;
  }

  async sendOTP(phone: string, type = 'register') {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedPassword = await hash(Random(10), 10); // Hash the code for password reset
    const message =
      type === 'register'
        ? `Your verification code is ${code}`
        : `Your new password  is ${hashedPassword}`;
    const url = `${process.env.SMS_API_URL}?username=${encodeURIComponent(this.username)}&password=${encodeURIComponent(this.password)}&sendername=${this.senderName}&message=${encodeURIComponent(message)}&mobiles=${phone}`;
    try {
      await axios.post(url, null, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Accept-Language': 'en-US',
        },
      });

      if (type === 'register') {
        await this.prisma.phoneVerification.upsert({
          where: { phone },
          update: { code, expiredAt: new Date(Date.now() + 5 * 60 * 1000) },
          create: {
            phone,
            code,
            expiredAt: new Date(Date.now() + 5 * 60 * 1000),
          },
        });
      }
      if (type === 'reset') {
        await this.prisma.user.update({
          where: { phone },
          data: {
            password: hashedPassword,
          },
        });
      }

      return { message: 'Verification code sent successfully' };
    } catch (e) {
      const error = e as Error;
      this.logger.error(`Error sending SMS: ${error.message}`, error.stack);
      return { data: false };
    }
  }

  async verifyCode(
    body: RegisterDto & { code: string },
    file?: Express.Multer.File,
  ) {
    const { phone, code } = body;

    console.log('body', body);
    const verification = await this.prisma.phoneVerification.findUnique({
      where: { phone },
    });

    if (!code) {
      throw new ConflictException('Verification code is required');
    }

    if (!verification) {
      throw new ConflictException('Invalid verification code');
    }

    if (verification.code !== code || new Date() > verification.expiredAt) {
      throw new ConflictException('Invalid verification code');
    }
    return await this.authService.signup(body, file);
  }

  async reSendOTP(phone: string, type = 'register') {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedPassword = await hash(Random(10), 10); // Hash the code for password reset
    const message =
      type === 'register'
        ? `Your verification code is ${code}`
        : `Your new password is ${hashedPassword}`;
    const url = `${process.env.SMS_API_URL}?username=${encodeURIComponent(this.username)}&password=${encodeURIComponent(this.password)}&sendername=${this.senderName}&message=${encodeURIComponent(message)}&mobiles=${phone}`;

    try {
      await axios.post(url, null, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Accept-Language': 'en-US',
        },
      });
      if (type === 'register') {
        await this.prisma.phoneVerification.upsert({
          where: { phone },
          update: { code, expiredAt: new Date(Date.now() + 5 * 60 * 1000) },
          create: {
            phone,
            code,
            expiredAt: new Date(Date.now() + 5 * 60 * 1000),
          },
        });
      }
      if (type === 'reset') {
        await this.prisma.user.update({
          where: { phone },
          data: {
            password: hashedPassword,
          },
        });
      }

      return { message: 'OTP resent successfully' };
    } catch (error) {
      this.logger.error(`Error resending OTP: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Failed to resend OTP');
    }

    return { message: 'OTP resent successfully' };
  }
}
