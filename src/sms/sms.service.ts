import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateSmDto } from './dto/create-sm.dto';
import { UpdateSmDto } from './dto/update-sm.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import axios from 'axios';

@Injectable()
export class SmsService {
  private readonly username: string;
  private readonly password: string;
  private readonly senderName: string;
  private readonly logger = new Logger(SmsService.name);

  constructor(private readonly prisma: PrismaService) {
    this.senderName = process.env.SMS_SENDERNAME;
    this.username = process.env.SMS_USERNAME;
    this.password = process.env.SMS_PASSWORD;
  }

  async sendVerificationCode(phone: string) {
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    const message = `Your verification code is ${code}`;
    const url = `${process.env.SMS_API_URL}?username=${encodeURIComponent(this.username)}&password=${encodeURIComponent(this.password)}&sendername=${this.senderName}&message=${encodeURIComponent(message)}&mobiles=${phone}`;

    try {
      await axios.post(url, null, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Accept-Language': 'en-US',
        },
      });

      await this.prisma.phoneVerification.upsert({
        where: { phone },
        update: { code, expiredAt: new Date(Date.now() + 5 * 60 * 1000) },
        create: {
          phone,
          code,
          expiredAt: new Date(Date.now() + 5 * 60 * 1000),
        },
      });

      return { message: 'Verification code sent successfully' };
    } catch (e) {
      const error = e as Error;
      this.logger.error(`Error sending SMS: ${error.message}`, error.stack);
      return { data: false };
    }
  }

  async verifyCode(mobile: string) {}
}
