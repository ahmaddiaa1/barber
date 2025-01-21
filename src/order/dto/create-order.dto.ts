import { Transform } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsArray,
  IsEnum,
  IsInt,
  Min,
  IsUUID,
} from 'class-validator';
import { OrderStatus, BookingStatus } from '@prisma/client'; // Import enums from Prisma

export class CreateOrderDto {
  userId: string;

  @IsString()
  date: Date;

  @IsString()
  slot: string;

  @IsArray()
  @IsString({ each: true })
  service: string[];

  @IsUUID()
  branchId: string;

  @IsOptional()
  @Transform(({ value }) => value ?? null)
  @IsString()
  note?: string;

  @IsInt()
  @Min(1)
  duration: number; // Duration in minutes

  @IsOptional()
  @Transform(({ value }) => value ?? null)
  @IsInt()
  @Min(0)
  points?: number;

  @IsOptional()
  @Transform(({ value }) => value ?? null)
  @IsString()
  promoCodeId?: string;

  // @IsInt()
  // subTotal: number;
  //
  // @IsInt()
  // total: number;

  @IsOptional()
  @Transform(({ value }) => value ?? null)
  @IsEnum(OrderStatus)
  status?: OrderStatus;

  @IsOptional()
  @Transform(({ value }) => value ?? null)
  @IsEnum(BookingStatus)
  booking?: BookingStatus;
}
