import { PackagesStatus } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
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

  @IsOptional()
  @Transform(({ value }) => +value)
  @IsNumber()
  count: number;

  @IsEnum(PackagesStatus)
  @IsOptional()
  @Transform(({ value }) => PackagesStatus[value])
  type: PackagesStatus;

  @IsNotEmpty()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  expiresAt: Date;
}
