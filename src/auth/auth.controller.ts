import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '@prisma/client';
import { RegisterDto } from './dto/auth-register-dto';
import { LoginDto } from './dto/auth-login-dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signup(@Body() createAuthDto: RegisterDto) {
    return this.authService.signup(createAuthDto);
  }

  @Post('/login')
  login(@Body() createAuthDto: LoginDto) {
    return this.authService.login(createAuthDto);
  }

  @Post('/logout')
  logout(@Body() createAuthDto: User) {
    return this.authService.logout(createAuthDto);
  }
}
