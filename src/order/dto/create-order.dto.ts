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
  promoCodeId?: string;

  // @IsInt()
  // subTotal: number;
  //
  // @IsInt()
  // total: number;

  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;

  @IsOptional()
  @IsEnum(BookingStatus)
  booking?: BookingStatus;
}
