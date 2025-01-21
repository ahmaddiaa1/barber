import { PromoType } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePromoCodeDto {
  @IsOptional()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsNumber()
  discount: number;

  @IsNotEmpty()
  @IsEnum(PromoType)
  type: PromoType;

  @IsNotEmpty()
  expiredAt: Date;
}
