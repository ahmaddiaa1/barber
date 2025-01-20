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
  branchImg: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(10)
  rate?: number;
}
