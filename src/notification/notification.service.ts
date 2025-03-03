import * as admin from 'firebase-admin';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationService {
  constructor() {
    if (!admin.apps.length) {
      // const serviceAccount = JSON.parse(
      //   fs.readFileSync('src/config/serviceAccountKey.json', 'utf-8'),
      // );
      admin.initializeApp({
        credential: admin.credential.cert(
          JSON.parse(process.env.FIREBASE_SECRET),
        ),
      });
    }
  }

  // Send notification to a single user
  async sendNotification(token: string, title: string, body: string) {
    const message = {
      notification: { title, body },
      token,
    };
    console.log(message);
    try {
      const response = await admin.messaging().send(message);
      return { success: true, response };
    } catch (error) {
      return { success: false, error };
    }
  }

  // Send notification to multiple users (e.g., all clients)
  async sendNotificationToMultiple(
    tokens: string[],
    title: string,
    body: string,
  ) {
    if (!tokens.length)
      return { success: false, error: 'No device tokens provided' };

    const message = {
      notification: { title, body },
      tokens,
    };

    try {
      const response = await admin.messaging().sendEachForMulticast(message);
      return { success: true, response };
    } catch (error) {
      return { success: false, error };
    }
  }

  async sendSms(phone: string, message: string) {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = require('twilio')(accountSid, authToken);
    client.messages
      .create({
        body: message,
        from: '+1 313 482 5424',
        to: phone,
      })
      .then((message: { sid: string }) => console.log(message.sid));
    return { success: true, message };
  }
}
