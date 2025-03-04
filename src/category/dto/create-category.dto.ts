import { IsArray, IsBoolean, IsOptional } from 'class-validator';
import { translationDto } from 'src/class-type/translation';

export class CreateCategoryDto {
  @IsBoolean()
  @IsOptional()
  available: boolean;

  @IsArray()
  Translation: translationDto[];
}
