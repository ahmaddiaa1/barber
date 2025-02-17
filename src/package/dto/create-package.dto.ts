import { Transform } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreatePackageDto {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsArray()
  serviceIds: string[];

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @Transform(({ value }) => +value)
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  expiresAt: Date;
}
