import { Controller, Post, Body, UseGuards, Res, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth-login-dto';
import { RegisterDto } from './dto/auth-register-dto';
import { AuthGuard } from 'guard/auth.guard';
import { Request } from 'express';
import { UserData } from 'decorators/user.decoretor';
import { User } from '@prisma/client';

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

  @Get('/current/profiles')
  @UseGuards(AuthGuard)
  currentUser(@UserData('user') user: User) {
    return this.authService.currentUser(user);
  }

  @Post('/logout')
  @UseGuards(AuthGuard)
  logout(@UserData('token') token: string) {
    return this.authService.logout(token);
  }
}
