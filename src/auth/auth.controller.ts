import { Controller, Post, Body, UseGuards, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth-login-dto';
import { RegisterDto } from './dto/auth-register-dto';
import { AuthGuard } from 'guard/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(AuthGuard)
  @Post('/signup')
  signup(@Body() createAuthDto: RegisterDto) {
    return this.authService.signup(createAuthDto);
  }

  @Post('/login')
  login(@Body() createAuthDto: LoginDto) {
    return this.authService.login(createAuthDto);
  }

  @Post('/logout')
  logout() {
    return this.authService.logout();
  }
}
