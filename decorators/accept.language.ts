import {
  SetMetadata,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';

// Custom decorator to set the Accept-Language header
export const Lang = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return (
      req.headers['accept-language'] || req.headers['Accept-Language'] || 'EN'
    );
  },
);
