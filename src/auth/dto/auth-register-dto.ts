import { Role } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
  ValidateIf,
} from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsOptional()
  @Transform(({ value }) => value ?? null)
  @IsString()
  avatar: string;

  @IsNotEmpty()
  @IsString()
  @Length(10, 16)
  phone: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @Transform(({ value }) => value ?? null)
  @IsString()
  referralCode: string;

  @IsOptional()
  @Transform(({ value }) => value ?? null)
  @IsString()
  role: Role;

  @ValidateIf(
    (object) =>
      object?.role?.toUpperCase() === 'CASHIER' ||
      object?.role?.toUpperCase() === 'BARBER',
  )
  @Transform(({ value }) => value ?? null)
  @IsNotEmpty()
  @IsString()
  branchId: string;

  @ValidateIf(
    (object) =>
      object?.role?.toUpperCase() === 'CASHIER' ||
      object?.role?.toUpperCase() === 'BARBER',
  )
  @Transform(({ value }) => Number(value) ?? null)
  @IsNotEmpty()
  @IsNumber()
  start: number;

  @ValidateIf(
    (object) =>
      object?.role?.toUpperCase() === 'CASHIER' ||
      object?.role?.toUpperCase() === 'BARBER',
  )
  @Transform(({ value }) => Number(value) ?? null)
  @IsNotEmpty()
  @IsNumber()
  end: number;
}
