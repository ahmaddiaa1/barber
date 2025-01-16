import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '@prisma/client';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  signup(@Body() createAuthDto: User) {
    return this.authService.signup(createAuthDto);
  }
  @Post()
  login(@Body() createAuthDto: User) {
    return this.authService.login(createAuthDto);
  }
  @Post()
  logout(@Body() createAuthDto: User) {
    return this.authService.logout(createAuthDto);
  }
}
