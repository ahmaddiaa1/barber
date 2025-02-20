import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { CategoryModule } from './category/category.module';
import { ServiceModule } from './service/service.module';
import { SupabaseModule } from './supabase/supabase.module';
import { OrderModule } from './order/order.module';
import { BranchModule } from './branch/branch.module';
import { PromoCodeModule } from './promo-code/promo-code.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TokenService } from './token.service';
import { ComplainModule } from './complain/complain.module';
import { AwsModule } from './aws/aws.module';
import { ConfigModule } from '@nestjs/config';
import { PointsModule } from './points/points.module';
import { MockModule } from './mock/mock.module';
import { PackageModule } from './package/package.module';
import { ClientPackagesModule } from './client-packages/client-packages.module';
import { PaymobModule } from './paymob/paymob.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AwsModule,
    AuthModule,
    UserModule,
    PrismaModule,
    PackageModule,
    CategoryModule,
    ServiceModule,
    SupabaseModule,
    OrderModule,
    BranchModule,
    PromoCodeModule,
    ScheduleModule.forRoot(),
    ComplainModule,
    ClientPackagesModule,
    PointsModule,
    PaymobModule,
    NotificationModule,
    MockModule,
  ],
  controllers: [],
  providers: [TokenService],
})
export class AppModule {}
