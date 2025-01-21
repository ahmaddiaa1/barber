import { Role } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

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
  phone: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @Transform(({ value }) => value ?? null)
  @IsString()
  referCode: string;

  @IsOptional()
  @Transform(({ value }) => value ?? null)
  @IsString()
  role: Role;
}
