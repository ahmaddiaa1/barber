import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from 'src/prisma/prisma.service';
import { AppSuccess } from 'src/utils/AppSuccess';

// Local storage for users

@Injectable()
export class NotificationService {
  constructor(readonly prisma: PrismaService) {
    // Initialize Firebase Admin SDK here if needed
  }
  private secret = process.env.JWT_SECRET;

  async setFCMToken(user: User, fcmToken: string) {
    console.log('Setting FCM token for user:', fcmToken, user.id);
    const token = await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        fcmToken,
      },
    });

    return new AppSuccess(
      { token: token.fcmToken },
      'FCM token updated successfully',
    );
  }

  async getNotification(user: User) {
    const notifications = await this.prisma.notification.findMany({
      where: {
        user: { some: { id: user.id } },
      },
    });
    return new AppSuccess(
      notifications,
      'Notifications retrieved successfully',
    );
  }
}
