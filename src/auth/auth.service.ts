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
import { Client, Prisma, Role, User } from '@prisma/client';
import { Random } from '../utils/generate';

@Global()
@Injectable()
export class AuthService {
  private readonly jwtSecret = process.env.JWT_SECRET;

  constructor(private prisma: PrismaService) {}

  public async signup(createAuthDto: RegisterDto, file: Express.Multer.File) {
    const {
      phone,
      password,
      role = Role.USER,
      branchId,
      start,
      end,
      referralCode: code,
    } = createAuthDto;

    let user: Omit<User, 'password'>;
    const saltOrRounds = 10;
    const settings = await this.prisma.settings.findFirst({});
    const existReferralCode = await this.checkReferralCode(code);
    const isPhoneExist = await this.prisma.user.findUnique({
      where: { phone },
    });
    if (isPhoneExist && !isPhoneExist.deleted) {
      throw new ConflictException('Phone number is already in use');
    }

    if (!Role[role?.toUpperCase()]) {
      throw new NotFoundException('Role not found');
    }

    const referralCodeStatus = code && existReferralCode.status;

    const hashedPassword = await hash(password, saltOrRounds);

    switch (role.toUpperCase()) {
      case Role.ADMIN:
        user = await this.createUser(
          createAuthDto,
          hashedPassword,
          {
            role: Role.ADMIN,
            admin: { create: {} },
          } as Prisma.UserCreateInput,
          file?.path,
        );

        break;

      case Role.USER:
        if (code && !referralCodeStatus) {
          throw new BadRequestException('Referral code is invalid');
        }

        let referralCode: string;
        do {
          referralCode = Random(6);
          const isReferralCodeExist = await this.prisma.client.findUnique({
            where: { referralCode },
          });
          if (!isReferralCodeExist) break;
        } while (true);

        if (isPhoneExist && isPhoneExist.deleted) {
          console.log('Restoring deleted user with referral code');
          user = await this.prisma.user.update({
            where: { phone },
            data: {
              firstName: createAuthDto.firstName,
              lastName: createAuthDto.lastName,
              password: hashedPassword,
              avatar: file?.path ?? '',
              role: Role.USER,
              client: {
                update: {
                  referralCode,
                  points: referralCodeStatus ? settings.referralPoints : 0,
                },
              },
            },
            omit: { password: true },
          });
          if (existReferralCode.user) {
            await this.prisma.client.update({
              where: { id: existReferralCode?.user?.id },
              data: {
                points: { increment: settings.referralPoints },
              },
            });
          }
          break;
        }
        if (!isPhoneExist) {
          console.log('Creating new user with referral code');
          user = await this.createUser(
            createAuthDto,
            hashedPassword,
            {
              role: Role.USER,
              client: {
                create: {
                  referralCode,
                  points: referralCodeStatus ? settings.referralPoints : 0,
                },
              },
            } as Prisma.UserCreateInput,
            file?.path,
          );
          if (existReferralCode.user) {
            await this.prisma.client.update({
              where: { id: existReferralCode?.user?.id },
              data: {
                points: { increment: settings.referralPoints },
              },
            });
          }
          break;
        }
        break;

      case Role.BARBER:
        if (!branchId)
          throw new BadRequestException('Branch ID is required for barbers');

        const barberSlot = await this.generateSlots(start, end);
        if (!barberSlot.length) {
          throw new BadRequestException('No slots generated for the barber');
        }
        user = await this.createUser(
          createAuthDto,
          hashedPassword,
          {
            role: Role.BARBER,
            barber: {
              create: {
                type: createAuthDto.type,
                branchId,
                rate: 5,
                Slot: {
                  create: {
                    start,
                    end,
                    slot: barberSlot,
                  },
                },
              },
            },
          } as Prisma.UserCreateInput,
          file?.path,
        );

        break;
      case Role.CASHIER:
        if (!branchId)
          throw new BadRequestException('Branch ID is required for cashiers');
        const cashierSlot = await this.generateSlots(start, end);
        if (!cashierSlot.length) {
          throw new BadRequestException('No slots generated for the barber');
        }
        user = await this.createUser(
          createAuthDto,
          hashedPassword,
          {
            role: Role.CASHIER,
            cashier: {
              create: {
                branchId,
                Slot: {
                  create: {
                    start,
                    end,
                    slot: cashierSlot,
                  },
                },
              },
            },
          } as Prisma.UserCreateInput,
          file?.path,
        );

        break;

      default:
        throw new BadRequestException('Invalid role');
    }

    const token = await this.generateToken(user.id);

    return {
      data: user,
      ...(role.toUpperCase() === Role.USER && { token }),
      message: 'User registered successfully',
      statusCode: 201,
    };
  }

  public async login(createAuthDto: LoginDto) {
    const { phone, password } = createAuthDto;

    const user = await this.prisma.user.findUnique({
      where: { phone },
    });

    if (!user || user.deleted)
      throw new NotFoundException('Invalid Phone number or password');

    const isPasswordCorrect = await compare(password, user.password);

    if (!isPasswordCorrect)
      throw new NotFoundException('Invalid Phone number or password');

    const userWithoutPassword = await this.prisma.user.findUnique({
      where: { phone },
      omit: { password: true },
    });

    const token = await this.generateToken(user.id);

    return {
      data: userWithoutPassword,
      token,
      message: 'login successfully',
      statusCode: 201,
    };
  }

  public async logout(token: string) {
    await this.invalidateToken(token);
    return new AppSuccess(null, 'logout successfully', 200);
  }

  public verifyToken(token: string) {
    try {
      return jwt.verify(token, this.jwtSecret);
    } catch (error) {
      throw new UnauthorizedException('Invalid token', error.message);
    }
  }

  public async invalidateToken(token: string) {
    const isToken = await this.prisma.token.findUnique({ where: { token } });
    if (!isToken) throw new UnauthorizedException('User already logged out');
    return await this.prisma.token.delete({
      where: { token },
    });
  }

  public async loginToken(token: string) {
    const decoded = jwt.decode(token);
    if (typeof decoded === 'object' && decoded !== null && 'exp' in decoded) {
      return await this.prisma.token.create({
        data: { token, expiredAt: new Date(decoded.exp * 1000) },
      });
    }
    throw new Error('Invalid token');
  }

  private async createUser(
    createAuthDto: RegisterDto,
    hashedPassword: string,
    data: any,
    avatar?: string,
  ) {
    const {
      branchId,
      role: roles = 'user',
      firstName,
      lastName,
      phone,
    } = createAuthDto;
    const role = roles.toUpperCase() as Role;

    if (branchId) {
      const isBranchExist = await this.prisma.branch.findUnique({
        where: { id: branchId },
      });
      if (!isBranchExist) throw new NotFoundException('Branch not found');
    }

    try {
      return this.prisma.$transaction(async (prisma) => {
        const user = await prisma.user.create({
          data: {
            firstName,
            lastName,
            phone,
            role,
            password: hashedPassword,
            ...(avatar && { avatar: avatar }),
          },
        });

        return await prisma.user.update({
          where: { id: user.id },
          data: {
            ...data,
            ...(avatar && { avatar: avatar }),
          },
          omit: { password: true },
          include: {
            barber: { include: { Slot: true } },
          },
        });
      });
    } catch (error) {
      throw new BadRequestException('Failed to create user', error.message);
    }
  }

  public async generateToken(userId: string) {
    const token = jwt.sign({ userId }, this.jwtSecret, { expiresIn: '6h' });
    await this.loginToken(token);
    return token;
  }

  public async checkReferralCode(
    referralCode: string,
  ): Promise<{ status: boolean; user: Client }> {
    const isReferralCodeExist = await this.prisma.client.findFirst({
      where: { referralCode },
    });
    if (!isReferralCodeExist) return { status: false, user: null };
    return { status: true, user: isReferralCodeExist };
  }

  async generateSlots(start: number, end: number) {
    const duration = (await this.prisma.settings.findFirst({})).slotDuration;

    if (!Number.isInteger(start) || !Number.isInteger(end))
      throw new BadRequestException(
        'Start and end must not be decimal, negative or string.',
      );

    if (start < 0 || start >= 24 || end < 0 || end > 24) {
      throw new BadRequestException(
        'Start and end must be Integer numbers between 0 and 24.',
      );
    }

    const slotsArray: string[] = [];

    // Handle case where time spans across midnight (e.g., start: 14, end: 0)
    if (start >= end) {
      // From start to end of day (24:00)
      for (let time = start * 60; time < 24 * 60; time += duration) {
        const hour = Math.floor(time / 60);
        const minute = time % 60;
        const formattedHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
        const period = hour >= 12 ? 'PM' : 'AM';
        const slot = `${formattedHour.toString().padStart(2, '0')}:${minute
          .toString()
          .padStart(2, '0')} ${period}`;
        slotsArray.push(slot);
      }

      // From start of day (00:00) to end - only if end > 0
      if (end > 0) {
        for (let time = 0; time < end * 60; time += duration) {
          const hour = Math.floor(time / 60);
          const minute = time % 60;
          const formattedHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
          const period = hour >= 12 ? 'PM' : 'AM';
          const slot = `${formattedHour.toString().padStart(2, '0')}:${minute
            .toString()
            .padStart(2, '0')} ${period}`;
          slotsArray.push(slot);
        }
      }
    } else {
      // Normal case where start < end
      for (let time = start * 60; time < end * 60; time += duration) {
        const hour = Math.floor(time / 60);
        const minute = time % 60;
        const formattedHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
        const period = hour >= 12 ? 'PM' : 'AM';
        const slot = `${formattedHour.toString().padStart(2, '0')}:${minute
          .toString()
          .padStart(2, '0')} ${period}`;
        slotsArray.push(slot);
      }
    }

    return slotsArray;
  }
}
