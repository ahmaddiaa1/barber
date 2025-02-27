import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';

import { PaymobService } from './paymob.service';
import { Response } from 'express';
import { config } from 'dotenv';
import { User } from '@prisma/client';
import { AuthGuard } from 'guard/auth.guard';
import { UserData } from 'decorators/user.decorator';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePaymobDto } from './dto/create-paymob.dto';

config();

@Controller('paymob')
export class PaymobController {
  private readonly IntegrationIds = {
    card: process.env.PAYMOB_CARD_INTEGRATION_ID,
    wallet: process.env.PAYMOB_WALLET_INTEGRATION_ID,
  };

  constructor(
    private readonly paymobService: PaymobService,
    private readonly prisma: PrismaService,
  ) {}

  @UseGuards(AuthGuard)
  @Post('payment-key')
  async getPaymentKey(
    @Body() body: CreatePaymobDto,
    @UserData('user') user: User,
    @Res() res: Response,
  ) {
    const { item: id } = body;
    const { firstName, lastName, phone } = user;

    const offers = await this.prisma.offers.findUnique({
      where: {
        id,
      },
      select: {
        offerType: true,
        packages: {
          select: {
            title: true,
            price: true,
            description: true,
          },
        },
        points: {
          select: {
            title: true,
            price: true,
          },
        },
      },
    });

    const type = offers.offerType.toLocaleLowerCase();

    const item = [
      {
        name: offers[type].title as string,
        amount: +offers[type].price * 100,
        description: (offers[type].description ?? offers[type].title) as string,
        quantity: 1,
      },
    ];

    const billing_data = {
      first_name: firstName,
      last_name: lastName,
      phone_number: `+2${phone}`,
    };

    const paymentKey = await this.paymobService.getPaymentKey(
      billing_data,
      item,
      id,
      offers[type].price,
    );

    return res.redirect(paymentKey);
  }

  @Get('verify')
  async verifyPaymobQuery(
    @Query() query: any,
    // @UserData('user') user: User,
    @Res() res: Response,
  ) {
    const authToken = await this.paymobService.getAuthToken();
    const user = { id: 'ac6e9814-b83a-43f4-90ff-aa6b47ede2ab' } as User;
    const isSuccess = this.paymobService.verifyPaymobQuery(
      query,
      authToken,
      user,
    );

    res.send(`
      <html>
        <head>
          <title>Payment Status</title>
          <script>
            setTimeout(() => {
              window.top.location.href = "https://www.google.com/";
            }, 5000);
          </script>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
            .status { font-size: 24px; font-weight: bold; margin-top: 20px; }
            .success { color: green; }
            .failed { color: red; }
          </style>
        </head>
        <body>
          <h1>Payment ${isSuccess ? 'Successful ✅' : 'Failed ❌'}</h1>
          <p class="status ${isSuccess ? 'success' : 'failed'}">
            Your transaction was ${isSuccess ? 'approved' : 'declined'}.
          </p>
          <p>Redirecting in 5 seconds...</p>
        </body>
      </html>
    `);
  }
}
