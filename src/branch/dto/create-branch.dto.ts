import { Transform } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsInt,
  Min,
  Max,
  IsNotEmpty,
  Length,
  IsArray,
} from 'class-validator';
import { translation } from 'src/class-type/translation';

export class CreateBranchDto {
  @IsString()
  name: string;

  @IsString()
  location: string;

  @IsNotEmpty()
  @IsString()
  @Length(10, 16)
  phone: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }) => value ?? null)
  branchImg: string;

  @IsOptional()
  @Transform(({ value }) => value ?? null)
  @IsInt()
  @Min(0)
  @Max(10)
  rate?: number;

  @IsArray()
  Translation: translation[];
}
