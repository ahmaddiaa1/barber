import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { translationDto } from '../../../src/class-type/translation';

export class CreatePointDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  points: number;

  @IsArray()
  Translation: translationDto[];
}
