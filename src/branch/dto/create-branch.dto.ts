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
  translations: translation[];
}

export class translation {
  @IsString()
  @Transform(({ value }) => value ?? null)
  name: string;

  @IsString()
  @Transform(({ value }) => value ?? null)
  lang: 'EN' | 'AR';
}
