import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsBoolean()
  @IsOptional()
  available: boolean;
}
