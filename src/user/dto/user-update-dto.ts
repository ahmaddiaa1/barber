import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';
import { RegisterDto } from 'src/auth/dto/auth-register-dto';

export class UserUpdateDto extends PartialType(RegisterDto) {
  @IsOptional()
  @IsString({ each: true })
  vacationsToDelete?: string[];
}
