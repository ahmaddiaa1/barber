import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { CategoryModule } from './category/category.module';
import { ServiceModule } from './service/service.module';

@Module({
  imports: [AuthModule, UserModule, PrismaModule, CategoryModule, ServiceModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
