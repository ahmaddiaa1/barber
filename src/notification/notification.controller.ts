import { Controller, Post, Body } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('single')
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationService.sendNotification('token', 'title', 'body');
  }

  @Post('multiple')
  createMultiple(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationService.sendNotificationToMultiple(
      ['token1', 'token2'],
      'title',
      'body',
    );
  }
}
