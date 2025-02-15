import {
  BadRequestException,
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
import { SupabaseService } from 'src/supabase/supabase.service';
import { AwsService } from 'src/aws/aws.service';
@Global()
@Injectable()
export class AuthService {
  private readonly jwtSecret = process.env.JWT_SECRET;

  constructor(
    private prisma: PrismaService,
    private supabaseService: SupabaseService,
    private awsService: AwsService,
  ) {}

  async signup(createAuthDto: RegisterDto, file: Express.Multer.File) {
    const { phone, password, role = Role.USER, branchId } = createAuthDto;
    let user: User;
    const saltOrRounds = 10;

    const isPhoneExist = await this.prisma.user.findUnique({
      where: { phone },
    });
    if (isPhoneExist) {
      throw new ConflictException('Phone number is already in use');
    }

    if (!Role[role?.toUpperCase()]) {
      throw new NotFoundException('Role not found');
    }

    const hashedPassword = await hash(password, saltOrRounds);

    switch (role.toUpperCase()) {
      case Role.ADMIN:
        user = await this.createUser(
          createAuthDto,
          hashedPassword,
          {
            role: Role.ADMIN,
            admin: { create: {} },
          },
          file,
        );

        break;

      case Role.USER:
        let referralCode: string;
        do {
          referralCode = this.generateRandomCode(6);
          const isReferralCodeExist = await this.prisma.client.findFirst({
            where: { referralCode },
          });
          if (!isReferralCodeExist) break;
        } while (true);

        user = await this.createUser(
          createAuthDto,
          hashedPassword,
          {
            role: Role.USER,
            client: {
              create: { referralCode },
            },
          },
          file,
        );

        break;

      case Role.BARBER:
        if (!branchId)
          throw new BadRequestException('Branch ID is required for barbers');
        user = await this.createUser(
          createAuthDto,
          hashedPassword,
          {
            role: Role.BARBER,
            barber: { create: { branchId } },
          },
          file,
        );

        break;

      case Role.CASHIER:
        if (!branchId)
          throw new BadRequestException('Branch ID is required for cashiers');
        user = await this.createUser(
          createAuthDto,
          hashedPassword,
          {
            role: Role.CASHIER,
            cashier: { create: { branchId } },
          },
          file,
        );

        break;

      default:
        throw new BadRequestException('Invalid role');
    }

    const token = await this.generateToken(user.id);
    const { password: _, ...data } = user;

    return {
      data,
      token,
      message: 'User registered successfully',
      statusCode: 201,
    };
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

    const token = await this.generateToken(user.id);

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
    return await this.prisma.token.delete({
      where: { token },
    });
  }

  async loginToken(token: string) {
    const decoded = jwt.decode(token);
    if (typeof decoded === 'object' && decoded !== null && 'exp' in decoded) {
      return await this.prisma.token.create({
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
    file?: Express.Multer.File,
  ) {
    const { branchId, role: roles = 'user', ...rest } = createAuthDto;
    const role = roles.toUpperCase() as Role;
    if (branchId) {
      const isBranchExist = await this.prisma.branch.findUnique({
        where: { id: branchId },
      });
      if (!isBranchExist) throw new NotFoundException('Branch not found');
    }

    const id = this.generateRandomCode(6);

    try {
      return this.prisma.$transaction(async (prisma) => {
        const avatarUrl = file
          ? await this.awsService.uploadFile(file, id, 'avatars')
          : undefined;
        const user = await prisma.user.create({
          data: { ...rest, role, password: hashedPassword },
        });

        return await prisma.user.update({
          where: { id: user.id },
          data: {
            ...data,
            ...(avatarUrl && { avatar: avatarUrl }),
          },
        });
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  private async generateToken(userId: string) {
    const token = jwt.sign({ userId }, this.jwtSecret, { expiresIn: '6h' });
    await this.loginToken(token);
    return token;
  }
}
