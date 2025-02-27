import { Module } from '@nestjs/common';
import { PaymobService } from './paymob.service';
import { PaymobController } from './paymob.controller';
import { ClientPackagesService } from 'src/client-packages/client-packages.service';
import { PointsService } from 'src/points/points.service';

@Module({
  controllers: [PaymobController],
  providers: [PaymobService, ClientPackagesService, PointsService],
})
export class PaymobModule {}
