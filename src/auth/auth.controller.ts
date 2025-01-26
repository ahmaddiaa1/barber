import { Controller, Post, Body, UseGuards, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth-login-dto';
import { RegisterDto } from './dto/auth-register-dto';
import { AuthGuard } from 'guard/auth.guard';
import { UserData } from 'decorators/user.decoretor';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signup(
    @Body() createAuthDto: RegisterDto,
    @Param('branchId') branchId: string,
  ) {
    return this.authService.signup(createAuthDto, branchId);
  }

  @Post('/login')
  login(@Body() createAuthDto: LoginDto) {
    return this.authService.login(createAuthDto);
  }

  // @Get('/current/profiles')
  // @UseGuards(AuthGuard)
  // currentUser(@UserData('user') user: User) {
  //   return this.authService.currentUser(user);
  // }

  @Post('/logout')
  @UseGuards(AuthGuard)
  logout(@UserData('token') token: string) {
    return this.authService.logout(token);
  }
}
