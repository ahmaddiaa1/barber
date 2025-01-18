import { PartialType } from '@nestjs/mapped-types';
import { RegisterDto } from 'src/auth/dto/auth-register-dto';

export class UserUpdateDto extends PartialType(RegisterDto) {}
