import { Module } from '@nestjs/common';
import { FirebaseService } from './notification.service';
import { NotificationController } from './notification.controller';

@Module({
  controllers: [NotificationController],
  providers: [FirebaseService],
})
export class NotificationModule {}
