import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from 'src/prisma/prisma.service';

// Local storage for users

@Injectable()
export class NotificationService {
  constructor(readonly prisma: PrismaService) {
    // Initialize Firebase Admin SDK here if needed
  }
  private secret = process.env.JWT_SECRET;

  async setFCMToken(user: User, fcmToken: string) {
    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        fcmToken,
      },
    });

    return { message: 'FCM token set' };
  }
}
