import { ConflictException, Injectable } from '@nestjs/common';
import { CreatePromoCodeDto } from './dto/create-promo-code.dto';
import { UpdatePromoCodeDto } from './dto/update-promo-code.dto';
import { PrismaService } from '../prisma/prisma.service';
import { AppSuccess } from 'src/utils/AppSuccess';

@Injectable()
export class PromoCodeService {
  constructor(private readonly prisma: PrismaService) {}

  private generateRandomCode(length = 10): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
  }

  async createPromoCode(createPromoCodeDto: CreatePromoCodeDto) {
    const { code, ...reset } = createPromoCodeDto;

    const promoCode = code ?? this.generateRandomCode();

    return await this.prisma.promoCode.create({
      data: {
        ...reset,
        code: promoCode,
        expiredAt: new Date(reset.expiredAt),
      },
    });
  }

  async getAllPromoCode() {
    const promoCode = await this.prisma.promoCode.findMany();
    return new AppSuccess(promoCode, 'Promo code list');
  }

  async validatePromoCode(promoCode: string) {
    const validPromoCode = await this.prisma.promoCode.findFirst({
      where: {
        code: promoCode,
        expiredAt: {
          gte: new Date(),
        },
      },
    });

    if (!validPromoCode) {
      throw new ConflictException(
        `Promo code "${promoCode}" is invalid or expired.`,
      );
    }

    return new AppSuccess(validPromoCode, 'Promo code is valid');
  }
}
