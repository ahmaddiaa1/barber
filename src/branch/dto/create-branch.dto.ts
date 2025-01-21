import { Transform } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsInt,
  Min,
  Max,
  IsPhoneNumber,
} from 'class-validator';

export class CreateBranchDto {
  @IsString()
  name: string;

  @IsString()
  location: string;

  @IsPhoneNumber()
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
}
