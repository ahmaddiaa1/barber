import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { compare, hash } from 'bcrypt';
import { RegisterDto } from './dto/auth-register-dto';
import { LoginDto } from './dto/auth-login-dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(createAuthDto: RegisterDto) {
    const { phone, password } = createAuthDto;
    const saltOrRounds = 10;

    const isPhoneExist = await this.prisma.user.findUnique({
      where: { phone },
    });
    if (isPhoneExist) throw new Error('Phone number already exists');

    const hashedPassword = await hash(password, saltOrRounds);

    return this.prisma.user.create({
      data: { ...createAuthDto, password: hashedPassword },
    });
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

    return user;
  }

  logout(createAuthDto: User) {}
}
