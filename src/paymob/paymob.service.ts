import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from 'src/prisma/prisma.service';
import * as crypto from 'crypto';
import { ClientPackagesService } from 'src/client-packages/client-packages.service';
import { User } from '@prisma/client';

@Injectable()
export class PaymobService {
  private readonly paymobBaseUrl = 'https://accept.paymob.com/api';
  private readonly apiKey = process.env.PAYMOB_API_KEY;

  constructor(
    private readonly prisma: PrismaService,
    private readonly purchasePackage: ClientPackagesService,
  ) {}

  async getAuthToken() {
    const response = await axios.post(`${this.paymobBaseUrl}/auth/tokens`, {
      api_key: this.apiKey,
    });

    return response.data.token;
  }

  async getPaymentKey() {
    try {
      const response = await axios.post(
        'https://accept.paymob.com/v1/intention',
        {
          amount: 200 * 100,
          currency: 'EGP',
          payment_methods: [
            +process.env.PAYMOB_CARD_INTEGRATION_ID,
            +process.env.PAYMOB_WALLET_INTEGRATION_ID,
          ],
          items: [
            {
              name: '5d2e9198-f2ed-4ad9-8599-dee012931cac',
              amount: 200 * 100,
              description: 'Item description',
              quantity: 1,
            },
          ],
          billing_data: {
            apartment: 'dumy',
            first_name: 'kareem',
            last_name: 'ahmad',
            street: 'dumy',
            building: 'dumy',
            phone_number: '+92345xxxxxxxx',
            city: 'dumy',
            country: 'dumy',
            email: 'ali@gmail.com',
            floor: 'dumy',
            state: 'dumy',
          },
          extras: {
            ee: 22,
          },
          // special_reference: 'phe4sjw11q-1xxxxxxxxx',
          // notification_url:
          // 'https://webhook.site/ffb5baf8-687c-45ce-ae24-8370bd5f4df3',
          redirection_url: 'https://www.google.com/',
        },
        {
          headers: {
            Authorization: `Token ${process.env.PAYMOB_SECRET_KEY}`,

            Accept: 'application/json',

            'Content-Type': 'application/json',
          },
        },
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async verifyPaymobQuery(payload: any, auth_token: string, user: User) {
    const PAYMOB_HMAC_SECRET = process.env.PAYMOB_HMAC_SECRET; // Replace with your actual secret

    // Extract the HMAC from the payload
    const providedHmac = payload.hmac;
    delete payload.hmac; // Remove it from the comparison data

    // Arrange ordered values as per Paymob’s documentation
    const orderedValues = [
      payload.amount_cents,
      payload.created_at,
      payload.currency,
      payload.error_occured,
      payload.has_parent_transaction,
      payload.id,
      payload.integration_id,
      payload.is_3d_secure,
      payload.is_auth,
      payload.is_capture,
      payload.is_refunded,
      payload.is_standalone_payment,
      payload.is_voided,
      payload.order,
      payload.owner,
      payload.pending,
      payload['source_data.pan'],
      payload['source_data.sub_type'],
      payload['source_data.type'],
      payload.success,
    ];

    // Concatenate values into a single string
    const concatenatedString = orderedValues.join('');

    // Generate HMAC using SHA-512
    const generatedHmac = crypto
      .createHmac('sha512', PAYMOB_HMAC_SECRET)
      .update(concatenatedString)
      .digest('hex');

    const success =
      generatedHmac === providedHmac && payload.success === 'true';

    console.log('success', success);

    if (success) {
      const response = await axios.post(
        'https://accept.paymob.com/api/ecommerce/orders/transaction_inquiry',
        {
          auth_token,
          order_id: payload.order,
        },
      );
      console.log('response', response.data);
      const packageId = response.data.order.items[0].name;

      this.purchasePackage.create(packageId, user);
      console.log('Package purchased successfully');
    }

    // Compare generated HMAC with provided HMAC
    return generatedHmac === providedHmac;
  }
}
