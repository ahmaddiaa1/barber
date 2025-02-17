import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
}
