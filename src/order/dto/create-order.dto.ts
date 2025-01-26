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

  @IsUUID()
  @IsNotEmpty()
  barberId: string;

  @IsArray()
  @IsString({ each: true })
  service: string[];

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
  @Transform(({ value }) => value ?? null)
  @IsString()
  promoCodeId?: string;

  // subTotal?: number;
  //
  // total?: number;

  @IsOptional()
  @Transform(({ value }) => value ?? null)
  @IsEnum(OrderStatus)
  status?: OrderStatus;

  @IsOptional()
  @Transform(({ value }) => value ?? null)
  @IsEnum(BookingStatus)
  booking?: BookingStatus;
}
