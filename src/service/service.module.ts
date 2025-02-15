import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { AwsService } from 'src/aws/aws.service';

@Module({
  controllers: [ServiceController],
  providers: [ServiceService],
})
export class ServiceModule {}
