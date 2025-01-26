import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtPayload } from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const token =
      req.headers['authorization']?.split(' ')[1] ||
      req.headers['Authorization']?.split(' ')[1];
    if (!token)
      throw new UnauthorizedException('Unautorized - No token provider');

    const result = await this.prisma.token.findUnique({ where: { token } });
    if (!result)
      throw new UnauthorizedException('Unautorized - No token provider');

    try {
      const payload = this.authService.verifyToken(token) as JwtPayload;
      const id = payload.userId;
      const user = await this.prisma.user.findUnique({
        where: { id },
      });
      req.user = user;
      req.token = token;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
