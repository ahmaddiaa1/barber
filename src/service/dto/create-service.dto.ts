import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  duration: number;

  @IsUUID()
  @IsNotEmpty()
  categoryId: string;
}
