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
import { AppSuccess } from 'utils/AppSuccess';
import { User } from '@prisma/client';

@Global()
@Injectable()
export class AuthService {
  private readonly blacklist = new Set<string>();
  private readonly jwtSecret = process.env.JWT_SECRET;

  constructor(private prisma: PrismaService) {}

  async signup(createAuthDto: RegisterDto) {
    const { phone, password } = createAuthDto;
    const saltOrRounds = 10;

    const isPhoneExist = await this.prisma.user.findUnique({
      where: { phone },
    });
    if (isPhoneExist)
      throw new ConflictException('phone number is already in use');
    const hashedPassword = await hash(password, saltOrRounds);

    const newUser = await this.prisma.user.create({
      data: { ...createAuthDto, password: hashedPassword },
    });
    return new AppSuccess(newUser, 'user created successfully', 201);
  }

  async login(createAuthDto: LoginDto) {
    const { phone, password } = createAuthDto;

    const user = await this.prisma.user.findUnique({
      where: { phone },
    });
    if (!user) throw new NotFoundException('phone number or password is wrong');
    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect)
      throw new NotFoundException('phone number or password is wrong');
    const token = jwt.sign({ userId: user.id }, this.jwtSecret, {
      expiresIn: '1h',
    });
    const { password: _, ...data } = user;
    return {
      data,
      token,
      message: 'login successfully',
      statusCode: 201,
    };
  }

  async logout(token: string) {
    this.invalidateToken(token);
    console.log(this.blacklist);
    return new AppSuccess(null, 'logout successfully', 200);
  }

  async currentUser(user: User) {
    return user;
  }

  verifyToken(token: string) {
    try {
      return jwt.verify(token, this.jwtSecret);
    } catch (error) {
      throw new UnauthorizedException('Invalid token', error.message);
    }
  }

  async invalidateToken(token: string) {
    this.blacklist.add(token);
  }

  isTokennBlacklisted(token: string) {
    return this.blacklist.has(token);
  }
}
