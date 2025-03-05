import { Transform } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { translationDto } from 'src/class-type/translation';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  productImg: string;

  @IsNumber()
  price: number;

  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  available: boolean;

  @IsArray()
  Translation: translationDto[];
}
