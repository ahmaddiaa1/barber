import { Controller, Post, Body, Get, Headers } from '@nestjs/common';
import { NotificationService } from './notification.service';
import * as jwt from 'jsonwebtoken';
import * as admin from 'firebase-admin';
import axios from 'axios';
const users = [] as {
  username: string;
  password: string;
  fcmToken: string | null;
}[];

@Controller()
export class NotificationController {
  constructor(private readonly authService: NotificationService) {}

  @Post('signup')
  signUp(@Body() body) {
    return this.authService.signUp(body.username, body.password, users);
  }

  @Post('login')
  login(@Body() body) {
    return this.authService.login(body.username, body.password, users);
  }

  @Post('set-fcm')
  setFCM(@Headers('Authorization') token, @Body() body) {
    console.log(token);
    const decoded = jwt.verify(token.split(' ')[1], 'your_jwt_secret') as {
      username: string;
    };
    console.log(decoded);
    return this.authService.setFCMToken(decoded.username, body.fcmToken, users);
  }

  @Post('send-notification')
  async sendNotification(@Headers('Authorization') token, @Body() body) {
    console.log(token);

    const decoded = jwt.verify(token.split(' ')[1], 'your_jwt_secret') as {
      username: string;
    };

    console.log(decoded);
    const user = users.find((u) => u.username === decoded.username);
    if (!user?.fcmToken) return { error: 'User has no FCM token' };

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

  @Get('users')
  getAuthUser() {
    return this.authService.getAuthUser(users);
  }
}
