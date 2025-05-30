import {
  Controller,
  Post,
  Body,
  Headers,
  UseGuards,
  Put,
  Get,
  NotFoundException,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import * as jwt from 'jsonwebtoken';
import * as admin from 'firebase-admin';
import { AuthGuard } from 'guard/auth.guard';
import { UserData } from 'decorators/user.decorator';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AppSuccess } from 'src/utils/AppSuccess';

@UseGuards(AuthGuard)
@Controller('notification')
export class NotificationController {
  constructor(
    private readonly NotificationService: NotificationService,
    private readonly prisma: PrismaService,
  ) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        privateKey: (process.env.FIREBASE_PRIVATE_KEY as string).replace(
          /\\n/g,
          '\n',
        ),
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      }),
    });
  }

  @Put('set-fcm')
  setFCM(@UserData('user') user: User, @Body() body) {
    return this.NotificationService.setFCMToken(user, body.fcmToken);
  }

  @Post('send-notification')
  async sendNotification(
    // @UserData('user') user: User,
    @Body()
    body: {
      fcmTokens: string[];
      title: string;
      message: string;
      imageUrl?: string;
    },
  ) {
    const message = {
      to: body.fcmTokens, // ✅ Must be a string, not an array
      notification: {
        title: body.title,
        body: body.message,
      },
    };
    console.log(message);
    const user = await this.prisma.user.findFirst({
      where: { fcmToken: body.fcmTokens[0] },
    });

    if (!user) {
      throw new NotFoundException('User not found with the provided FCM token');
    }

    try {
      const [noti] = await Promise.all([
        admin.messaging().sendEachForMulticast({
          tokens: body.fcmTokens,
          android: { notification: { color: '#000000' } },
          notification: {
            title: body.title,
            body: body.message,
            ...(body.imageUrl && { image: body.imageUrl }),
          },
        }),

        this.prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            notification: {
              create: {
                title: body.title,
                content: body.message,
                image: body.imageUrl,
              },
            },
          },
        }),
      ]);

      console.log('Notification sent successfully to:', user.fcmToken);
      return new AppSuccess(noti, 'Notification sent successfully');
    } catch (error) {
      console.log(error);
      return { error: 'Failed to send notification' };
    }
  }

  @Get('get-history')
  getNotification(@UserData('user') user: User) {
    return this.NotificationService.getNotification(user);
  }
}
