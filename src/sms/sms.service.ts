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

  async sendVerificationCode(mobile: string) {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const message = `Your verification code is ${code}`;
    const url = `https://smssmartegypt.com/sms/api/`;

    console.log(url);

    try {
      const { data } = await axios.post(url, null, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Accept-Language': 'en-US',
        },
        params: {
          username: this.username,
          password: this.password,
          sendername: this.senderName,
          message: message,
          mobiles: mobile,
        },
      });

      // console.log(data.type ?? data[0].type);
      console.log(data);
      const type = data.type ?? data[0].type;
      if (type === 'error' && data.error.number === 300) {
        await this.prisma.phoneVerification.create({
          data: {
            code: code.toString(),
            phone: mobile.toString(),
          },
        });
        return { data: true };
      } else if (type === 'error' && data.error.number !== 300) {
        this.logger.error(`SMS API Error: ${data.error.message}`);
        return { data: false };
      }
      return { data: true, code };
    } catch (e) {
      const error = e as Error;
      this.logger.error(`Error sending SMS: ${error.message}`, error.stack);
      return { data: false };
    }
  }

  // async verifyCode(mobile: string, code: string) {
  //   const sms = await this.prisma.sms.findFirst({
  //     where: { mobile, code },
  //   });

  //   if (!sms) {
  //     throw new InternalServerErrorException('Invalid verification code');
  //   }

  //   // Optionally, you can delete the SMS record after successful verification
  //   await this.prisma.sms.delete({ where: { id: sms.id } });

  //   return { message: 'Verification successful' };
  // }
}
