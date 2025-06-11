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
    this.username = process.env.SMS_USERNAME;
    this.password = process.env.SMS_PASSWORD;
    this.senderName = process.env.SMS_SENDER_NAME;
  }

  async sendVerificationCode(mobile: string) {
    const code = 12356; // This should be generated dynamically, e.g., using a random number generator

    const message = `Your verification code is ${code}`;
    const url = `${process.env.SMS_API_URL}?username=${this.username}&password=${this.password}&sendername=${this.senderName}&message=${message}&mobiles=${mobile}`;

    console.log(url);

    try {
      const { data } = await axios.post(url, null, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Accept-Language': 'en-US',
        },
      });

      console.log(data);

      return data;
    } catch (e) {
      const error = e as Error;
      this.logger.error(`Error sending SMS: ${error.message}`, error.stack);
      throw new InternalServerErrorException(error);
    }
  }
}
