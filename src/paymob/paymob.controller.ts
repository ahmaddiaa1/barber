import { Body, Controller, Get, Query, Res } from '@nestjs/common';
import { PaymobService } from './paymob.service';
import { Response } from 'express';
import { config } from 'dotenv';
import { User } from '@prisma/client';

config();

// @UseGuards(AuthGuard)
@Controller('paymob')
export class PaymobController {
  private readonly IntegrationIds = {
    card: process.env.PAYMOB_CARD_INTEGRATION_ID,
    wallet: process.env.PAYMOB_WALLET_INTEGRATION_ID,
  };

  constructor(private readonly paymobService: PaymobService) {}

  @Get('payment-key')
  async getPaymentKey(
    @Body('items') items: any[],
    @Body('billing') billing: any[],
    @Body('method') method: 'card' | 'wallet',
    @Query('amount') amount: number,
    @Res() res: Response,
  ) {
    // console.log('items', items);
    // console.log('billing', billing);

    // const selectedIntegrationId = this.IntegrationIds[method];

    // const authToken = await this.paymobService.getAuthToken();
    // const orderId = await this.paymobService.createOrder(
    //   authToken,
    //   amount,
    //   // items,
    // );
    const paymentKey = await this.paymobService.getPaymentKey();
    // authToken,
    // billing,
    // orderId,
    // amount,
    // selectedIntegrationId,

    return res.redirect(paymentKey);
  }

  @Get('verify')
  async verifyPaymobQuery(
    @Query() query: any,
    // @UserData('user') user: User,
  ) {
    const authToken = await this.paymobService.getAuthToken();

    // const user = { id: 'b556fd82-e457-4521-a01d-c4e301eeb641' } as User;
    const user = { id: '575f9d39-981e-46e7-9146-9ce66e60fd25' } as User;
    console.log('query', query, user);
    return this.paymobService.verifyPaymobQuery(query, authToken, user);
  }
}
