import { Transform } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsArray,
  IsEnum,
  IsInt,
  Min,
  IsUUID,
  IsNotEmpty,
} from 'class-validator';
import { OrderStatus, BookingStatus } from '@prisma/client'; // Import enums from Prisma

export class CreateOrderDto {
  userId: string;

  @IsString()
  date: Date;

  @IsString()
  slot: string;

  @IsOptional()
  @IsUUID()
  @IsNotEmpty()
  barberId: string;

  @IsArray()
  @IsString({ each: true })
  service: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  packages: string[];

  @IsOptional()
  @IsUUID()
  branchId: string;

  @IsOptional()
  @Transform(({ value }) => value ?? null)
  @IsString()
  note?: string;

  @IsOptional()
  @Transform(({ value }) => value ?? null)
  @IsInt()
  @Min(0)
  points?: number;

  @IsOptional()
  // @Transform(({ value }) => value ?? null)
  @IsString()
  promoCode?: string;

  // subTotal?: number;
  //
  // total?: number;
  @IsOptional()
  @IsString()
  usedPackage?: string;

  @IsOptional()
  @Transform(({ value }) => value ?? null)
  @IsEnum(OrderStatus)
  status?: OrderStatus;

  @IsOptional()
  @Transform(({ value }) => value ?? null)
  @IsEnum(BookingStatus)
  booking?: BookingStatus;
}
