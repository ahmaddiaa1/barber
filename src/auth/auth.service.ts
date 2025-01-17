import {
  ConflictException,
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

@Injectable()
export class AuthService {
  private readonly jwtSecret = process.env.JWT_SECRET;

  constructor(private prisma: PrismaService) {}

  async signup(createAuthDto: RegisterDto) {
    const { phone, password } = createAuthDto;
    const saltOrRounds = 10;

    const isPhoneExsist = await this.prisma.user.findUnique({
      where: { phone },
    });
    console.log(isPhoneExsist);
    if (isPhoneExsist)
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
    return {
      data: user,
      token,
      message: 'login successfully',
      statusCode: 201,
    };
  }
  async logout() {}

  verifyToken(token: string) {
    try {
      return jwt.verify(token, this.jwtSecret);
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
