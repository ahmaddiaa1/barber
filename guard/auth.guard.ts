import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const token =
      req.headers['authorization']?.split(' ')[1] ||
      req.headers['Authorization']?.split(' ')[1];
    if (!token) throw new UnauthorizedException('No token provided');

    if (token && this.authService.isTokennBlacklisted(token))
      throw new UnauthorizedException('Token is expires');

    try {
      const user = this.authService.verifyToken(token);
      req.user = user;
      req.token = token;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
