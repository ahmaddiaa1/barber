import {
  SetMetadata,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { Language } from '@prisma/client';

// Custom decorator to set the Accept-Language header
export const Lang = createParamDecorator((ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const lang = (request.headers['accept-language'] || 'EN') as Language;
  return lang;
});
