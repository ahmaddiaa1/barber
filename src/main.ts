import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import * as express from 'express';
import { join } from 'path';

config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  app.use(express.static(join(__dirname, '..', 'public')));
  const prismaService = app.get(PrismaService);
  await prismaService.onModuleInit();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      forbidUnknownValues: false,
      whitelist: true,
      exceptionFactory: (data) => {
        return new BadRequestException(JSON.stringify(data));
      },
    }),
  );
  await app.listen(process.env.PORT ?? 8080, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
}
bootstrap();
