import { Controller, Post, Body } from '@nestjs/common';
import { FirebaseService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Controller('notification')
export class NotificationController {
  constructor(private readonly firebaseService: FirebaseService) {}

  @Post('single')
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.firebaseService.sendNotification(['token'], 'title', 'body');
  }

  @Post('multiple')
  createMultiple(@Body() createNotificationDto: CreateNotificationDto) {
    return this.firebaseService.sendToAllClients('title', 'body', {
      key: 'value',
    });
  }
}
