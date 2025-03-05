import { Translation } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  productImg: string;

  @IsNumber()
  price: number;

  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  available: boolean;

  @IsArray()
  Translation: Translation[];
}
