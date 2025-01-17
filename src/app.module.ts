import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [AuthModule, UserModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
