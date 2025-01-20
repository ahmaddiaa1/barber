import {
  IsString,
  IsOptional,
  IsArray,
  IsEnum,
  IsInt,
  Min,
  Length,
  IsUUID,
} from 'class-validator';
import { OrderStatus, BookingStatus } from '@prisma/client'; // Import enums from Prisma

export class CreateOrderDto {
  @IsString()
  date: Date;

  @IsString()
  slot: string;

  @IsArray()
  @IsString({ each: true })
  services: string[]; // List of service IDs being booked

  @IsUUID()
  branchId: string;

  @IsOptional()
  @IsString()
  note?: string;

  @IsInt()
  @Min(1)
  duration: number; // Duration in minutes

  @IsOptional()
  @IsInt()
  @Min(0)
  points?: number;

  @IsOptional()
  @IsString()
  @Length(1, 20)
  promoCode?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  discount?: number;

  @IsInt()
  @Min(1)
  subTotal: number;

  @IsInt()
  @Min(1)
  total: number;

  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;

  @IsOptional()
  @IsEnum(BookingStatus)
  booking?: BookingStatus;
}
