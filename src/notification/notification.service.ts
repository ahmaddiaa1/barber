// firebase.service.ts

import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FirebaseService {
  constructor(private readonly prisma: PrismaService) {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(
          JSON.parse(process.env.FIREBASE_SECRET),
        ),
      });
    }
  }

  // Send notification to specific tokens
  async sendNotification(
    tokens: string[],
    title: string,
    body: string,
    data?: Record<string, string>,
  ) {
    const message = {
      notification: { title, body },
      data,
      tokens,
    };

    try {
      const response = await admin.messaging().sendEachForMulticast(message);

      // const notifications = await this.prisma.notification.createMany({})

      console.log('Notifications sent:', response.successCount);
      console.log('Notifications failed:', response);
    } catch (error) {
      console.error('Error sending notifications:', error);
    }
  }

  // Send notification to all clients via FCM topic
  async sendToAllClients(
    title: string,
    body: string,
    data?: Record<string, string>,
  ) {
    const message = {
      notification: { title, body },
      data,
      topic: 'allClients',
    };

    try {
      const response = await admin.messaging().send(message);
      console.log('Notification sent to all clients:', response);
    } catch (error) {
      console.error('Error sending notification to all clients:', error);
    }
  }
}
