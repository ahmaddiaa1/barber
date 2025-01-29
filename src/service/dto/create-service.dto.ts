import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Matches,
  ValidateIf,
} from 'class-validator';

export class CreateServiceDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @ValidateIf(
    (obj) =>
      typeof obj.duration === 'string' || typeof obj.duration === 'number',
  )
  @IsNotEmpty()
  @Transform(({ value }) => +value)
  price: number;

  @ValidateIf(
    (obj) =>
      typeof obj.duration === 'string' || typeof obj.duration === 'number',
  )
  @IsNotEmpty()
  @Transform(({ value }) => +value)
  duration: number;

  @ValidateIf(
    (obj) =>
      typeof obj.duration === 'string' || typeof obj.duration === 'number',
  )
  @Transform(({ value }) => +value)
  points: number;

  @ValidateIf(
    (obj) =>
      typeof obj.duration === 'string' || typeof obj.duration === 'number',
  )
  @Transform(({ value }) => +value)
  gainPoints: number;

  @IsUUID()
  @IsNotEmpty()
  categoryId: string;
}
