import { Controller, Post, Body, Headers, UseGuards } from '@nestjs/common';
import { NotificationService } from './notification.service';
import * as jwt from 'jsonwebtoken';
import * as admin from 'firebase-admin';
import { AuthGuard } from 'guard/auth.guard';
import { UserData } from 'decorators/user.decorator';
import { User } from '@prisma/client';

@UseGuards(AuthGuard)
@Controller()
export class NotificationController {
  constructor(private readonly authService: NotificationService) {}

  @Post('set-fcm')
  setFCM(@UserData('user') user: User, @Body() body) {
    return this.authService.setFCMToken(user, body.fcmToken);
  }

  @Post('send-notification')
  async sendNotification(
    @UserData('user') user: User,
    @Body() body: { title: string; message: string },
  ) {
    const message = {
      to: user.fcmToken, // ✅ Must be a string, not an array
      notification: {
        title: body.title,
        body: body.message,
      },
    };
    console.log(message);

    try {
      await admin.messaging().send({
        token: user.fcmToken,
        notification: {
          title: body.title,
          body: body.message,
        },
      });
    } catch (error) {
      console.log(error);
      return { error: 'Failed to send notification' };
    }

    return { success: true };
  }
}
