import {
  ConflictException,
  Global,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { compare, hash } from 'bcrypt';
import { RegisterDto } from './dto/auth-register-dto';
import { LoginDto } from './dto/auth-login-dto';
import * as jwt from 'jsonwebtoken';
import { AppSuccess } from '../utils/AppSuccess';
import { Role, User } from '@prisma/client';

@Global()
@Injectable()
export class AuthService {
  private readonly jwtSecret = process.env.JWT_SECRET;

  constructor(private prisma: PrismaService) {}

  async signup(createAuthDto: RegisterDto) {
    const { phone, password, role = 'user', branchId } = createAuthDto;
    let user: User;
    const saltOrRounds = 10;
    const roles = role.toUpperCase() as Role;

    const isPhoneExist = await this.prisma.user.findUnique({
      where: { phone },
    });

    if (!Role[roles.toUpperCase()])
      throw new NotFoundException('Role not found');

    if (isPhoneExist)
      throw new ConflictException('phone number is already in use');

    const hashedPassword = await hash(password, saltOrRounds);

    if (roles === Role.ADMIN) {
      user = await this.createUser(createAuthDto, hashedPassword, {
        role: 'ADMIN',
        admin: { create: {} },
      });
    } else if (roles === Role.USER) {
      let referralCode: string;

      do {
        referralCode = this.generateRandomCode(6);
        const isReferralCodeExist = await this.prisma.client.findFirst({
          where: { referralCode },
        });
        if (!isReferralCodeExist) break;
      } while (true);
      user = await this.createUser(createAuthDto, hashedPassword, {
        client: {
          create: {
            referralCode,
          },
        },
      });
    } else if (roles === Role.BARBER) {
      user = await this.createUser(createAuthDto, hashedPassword, {
        role: 'BARBER',
        barber: {
          create: { branchId },
        },
      });
    } else if (roles === Role.CASHIER) {
      user = await this.createUser(createAuthDto, hashedPassword, {
        role: 'CASHIER',
        cashier: {
          create: { branchId },
        },
      });
    }

    return new AppSuccess(user, 'user created successfully', 201);
  }

  async login(createAuthDto: LoginDto) {
    const { phone, password } = createAuthDto;

    const user = await this.prisma.user.findUnique({
      where: { phone },
    });

    if (!user) throw new NotFoundException('Invalid Phone number or password');

    const isPasswordCorrect = await compare(password, user.password);

    if (!isPasswordCorrect)
      throw new NotFoundException('Invalid Phone number or password');

    const token = jwt.sign({ userId: user.id }, this.jwtSecret, {
      expiresIn: '1h',
    });

    await this.loginToken(token);

    const { password: _, ...data } = user;
    return {
      data,
      token,
      message: 'login successfully',
      statusCode: 201,
    };
  }

  async logout(token: string) {
    await this.invalidateToken(token);
    return new AppSuccess(null, 'logout successfully', 200);
  }

  verifyToken(token: string) {
    try {
      return jwt.verify(token, this.jwtSecret);
    } catch (error) {
      throw new UnauthorizedException('Invalid token', error.message);
    }
  }

  async invalidateToken(token: string) {
    const isToken = await this.prisma.token.findUnique({ where: { token } });
    if (!isToken) throw new UnauthorizedException('User already logged out');
    return this.prisma.token.delete({
      where: { token },
    });
  }

  // async isTokenBlacklisted(token: string) {
  //   const tokens = await this.prisma.token.findUnique({
  //     where: { token },
  //   });
  //   return !tokens;
  // }

  async loginToken(token: string) {
    const decoded = jwt.decode(token);
    console.log(decoded);
    if (typeof decoded === 'object' && decoded !== null && 'exp' in decoded) {
      return this.prisma.token.create({
        data: { token, expiredAt: new Date(decoded.exp * 1000) },
      });
    }
    throw new Error('Invalid token');
  }

  private generateRandomCode(length: number): string {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  private async createUser(
    createAuthDto: RegisterDto,
    hashedPassword: string,
    data: any,
  ) {
    const { branchId, role: roles, ...rest } = createAuthDto;
    const role = roles.toUpperCase() as Role;
    if (branchId) {
      const isBranchExist = await this.prisma.branch.findUnique({
        where: { id: branchId },
      });
      if (!isBranchExist) throw new NotFoundException('Branch not found');
    }

    return this.prisma.$transaction(async (prisma) => {
      const user = await prisma.user.create({
        data: { ...rest, role, password: hashedPassword },
      });

      return await prisma.user.update({
        where: { id: user.id },
        data,
      });
    });
  }
}
