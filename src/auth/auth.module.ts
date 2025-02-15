import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AwsService } from 'src/aws/aws.service';

@Global()
@Module({
  controllers: [AuthController],
  providers: [AuthService, AwsService],
  exports: [AuthService],
})
export class AuthModule {}
