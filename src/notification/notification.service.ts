import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as admin from 'firebase-admin';
import * as path from 'path';

@Injectable()
export class NotificationService {
  constructor(private readonly prisma: PrismaService) {
    admin.initializeApp({
      credential: admin.credential.cert(
        require('../../secret/notification-barber-firebase-adminsdk-fbsvc-73b2ccd47c.json'),
      ),
    });
  }

  async sendNotificationToUsers(title: string, message: string) {
    // 1️⃣ Fetch all users (excluding admins) with an FCM token
    const users = await this.prisma.user.findMany({
      where: { role: 'USER', NOT: { fcmToken: null } }, // Exclude admins & users without tokens
      select: { fcmToken: true }, // Get only fcmToken field
    });

    const tokens = users.map((user) => user.fcmToken); // Extract FCM tokens

    if (tokens.length === 0) {
      console.log('⚠️ No users with FCM tokens found.');
      return;
    }

    // 2️⃣ Prepare the notification payload
    const payload = {
      notification: {
        title: title,
        body: message,
      },
    };

    try {
      // 3️⃣ Send push notifications using Firebase
      const response = await admin
        .messaging()
        .sendEachForMulticast({ tokens, ...payload });
      console.log('✅ Notification sent to users successfully');
    } catch (error) {
      console.error('❌ Error sending push notification:', error);
    }
  }

  findAll() {}
  findOne(id: number) {
    return `This action returns a #${id} notification`;
  }

  update(id: number, updateNotificationDto: UpdateNotificationDto) {
    return `This action updates a #${id} notification`;
  }

  remove(id: number) {
    return `This action removes a #${id} notification`;
  }
}
