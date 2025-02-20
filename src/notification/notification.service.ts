import { Injectable } from '@nestjs/common';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as admin from 'firebase-admin';
import * as path from 'path';

@Injectable()
export class NotificationService {
  constructor(private readonly prisma: PrismaService) {
    admin.initializeApp({
      credential: admin.credential.cert(
        require(
          path.join(__dirname, '../../../src/config/serviceAccountKey.json'),
        ),
      ),
    });
  }

  async sendNotificationToUsers(title: string, message: string) {
    const users = await this.prisma.user.findMany({
      where: { role: 'USER', NOT: { fcmToken: null } },
      select: { fcmToken: true },
    });

    const tokens = users.map((user) => user.fcmToken);

    if (tokens.length === 0) {
      console.log('⚠️ No users with FCM tokens found.');
      return;
    }

    const payload = {
      notification: {
        title: title,
        body: message,
      },
    };

    try {
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
