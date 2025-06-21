import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import axios from 'axios';
import { RegisterDto } from 'src/auth/dto/auth-register-dto';
import { AuthService } from 'src/auth/auth.service';
import { Random } from 'src/utils/generate';
import { hash } from 'bcrypt';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class SmsService {
  private readonly username: string;
  private readonly password: string;
  private readonly senderName: string;
  private readonly logger = new Logger(SmsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly authService: AuthService,
  ) {
    this.senderName = process.env.SMS_SENDERNAME;
    this.username = process.env.SMS_USERNAME;
    this.password = process.env.SMS_PASSWORD;
  }
  // At the top of the class
  private otpStore = new Map<
    string,
    { lastSent: number; resendCount: number; countExpiresAt: number }
  >();

  async sendOTP(phone: string, type = 'register') {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const pass = Random(6);
    const message =
      type === 'register'
        ? `[NAEMAN] Your verification code is: ${code}.
It expires in 5 minutes. Do not share this code with anyone.
`
        : `[NAEMAN] Your secure access code: ${pass} 
Use this to log in. Do not share this code.
If you didn't request it, contact support.`;

    const url = `${process.env.SMS_API_URL}?username=${encodeURIComponent(this.username)}&password=${encodeURIComponent(this.password)}&sendername=${this.senderName}&message=${encodeURIComponent(message)}&mobiles=${phone}`;

    const userExists = await this.prisma.user.findUnique({
      where: { phone },
    });

    if (type === 'register' && userExists)
      throw new ConflictException('User already exists with this phone number');
    if (type === 'reset' && !userExists)
      throw new NotFoundException('User not found with this phone number');

    try {
      await axios.post(url, null, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Accept-Language': 'en-US',
        },
      });

      if (type === 'register' && !userExists) {
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
      if (type === 'reset' && userExists) {
        await this.prisma.user.update({
          where: { phone },
          data: {
            password: await hash(pass, 10),
          },
        });
      }

      return { message: 'Message code sent successfully' };
    } catch (e) {
      if (e instanceof ConflictException || e instanceof NotFoundException) {
        throw e;
      }

      const error = e as Error;
      this.logger.error(`Error sending SMS: ${error.message}`, error.stack);
    }
  }

  async verifyCode(
    body: RegisterDto & { code: string },
    file?: Express.Multer.File,
  ) {
    const { phone, code, ...rest } = body;

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
    return await this.authService.signup({ phone, ...rest }, file);
  }

  async reSendOTP(phone: string, type = 'register') {
    const now = Date.now();
    const cooldown = 60 * 1000; // 60 seconds
    const maxResends = 3;
    const windowDuration = 15 * 60 * 1000; // 15 minutes

    const existing = this.otpStore.get(phone);

    // Reset resend count if window expired
    if (existing && existing.countExpiresAt && now > existing.countExpiresAt) {
      existing.resendCount = 0;
      existing.countExpiresAt = now + windowDuration;
    }

    // Check cooldown
    if (existing && now - existing.lastSent < cooldown) {
      const wait = Math.ceil((cooldown - (now - existing.lastSent)) / 1000);
      throw new ConflictException(`Please wait ${wait}s before resending OTP`);
    }

    // Check resend limit
    if (existing && existing.resendCount >= maxResends) {
      throw new ConflictException('Maximum OTP resend attempts reached');
    }

    // Generate OTP or Password
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const pass = Random(6); // Assuming you have a Random(length) function

    // Create message
    const message =
      type === 'register'
        ? `[NAEMAN] Your verification code is: ${code}.
  It expires in 5 minutes. Do not share this code with anyone.`
        : `[NAEMAN] Your secure access code: ${pass}
  Use this to log in. Do not share this code.
  If you didn't request it, contact support.`;

    // Build SMS URL
    const url = `${process.env.SMS_API_URL}?username=${encodeURIComponent(
      this.username,
    )}&password=${encodeURIComponent(
      this.password,
    )}&sendername=${this.senderName}&message=${encodeURIComponent(
      message,
    )}&mobiles=${phone}`;

    try {
      // Send SMS
      await axios.post(url, null, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Accept-Language': 'en-US',
        },
      });

      // Update in-memory OTP store
      const resendCount = existing ? existing.resendCount + 1 : 1;
      const countExpiresAt = existing
        ? existing.countExpiresAt
        : now + windowDuration;

      this.otpStore.set(phone, {
        lastSent: now,
        resendCount,
        countExpiresAt,
      });

      // Handle OTP persistence (via Prisma)
      if (type === 'register') {
        await this.prisma.phoneVerification.upsert({
          where: { phone },
          update: { code, expiredAt: new Date(now + 5 * 60 * 1000) },
          create: {
            phone,
            code,
            expiredAt: new Date(now + 5 * 60 * 1000),
          },
        });
      }

      if (type === 'reset') {
        await this.prisma.user.update({
          where: { phone },
          data: {
            password: await hash(pass, 10),
          },
        });
      }

      return { message: 'Message resent successfully' };
    } catch (error) {
      if (
        error instanceof ConflictException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }

      this.logger.error(`Error resending OTP: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Failed to resend OTP');
    }
  }
  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  handleOtpCleanup() {
    const now = Date.now();
    for (const [phone, data] of this.otpStore.entries()) {
      if (data.countExpiresAt < now) {
        this.otpStore.delete(phone);
        console.log(`[OTP Cleanup] Removed expired OTP for ${phone}`);
      }
    }
  }
}
