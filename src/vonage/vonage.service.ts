import { Injectable } from '@nestjs/common';
import { Vonage } from '@vonage/server-sdk';

@Injectable()
export class VonageService {
  private vonage: Vonage;

  constructor() {
    const apiKey = process.env.VONAGE_API_KEY;
    const apiSecret = process.env.VONAGE_API_SECRET;

    this.vonage = new Vonage({
      apiKey,
      apiSecret,
    } as any);
  }
  
  // 4d6e854f-8e2e-40be-l3a3-bbc67b308d1b

  async sendSMS(to: string, from: string, text: string) {
    return new Promise((resolve, reject) => {
      this.vonage.sms
        .send({ to, from, text })
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }
}
