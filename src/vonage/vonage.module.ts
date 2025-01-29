import { Global, Module } from '@nestjs/common';
import { VonageService } from './vonage.service';

@Global()
@Module({
  providers: [VonageService],
  exports: [VonageService],
})
export class PrismaModule {}
