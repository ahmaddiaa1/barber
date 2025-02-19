import { ConflictException, Injectable } from '@nestjs/common';
import { CreatePromoCodeDto } from './dto/create-promo-code.dto';
import { UpdatePromoCodeDto } from './dto/update-promo-code.dto';
import { PrismaService } from '../prisma/prisma.service';
import { AppSuccess } from 'src/utils/AppSuccess';
import { PromoCode } from '@prisma/client';
import { Random } from 'src/utils/generate';

@Injectable()
export class PromoCodeService {
  constructor(private readonly prisma: PrismaService) {}

  async createPromoCode(
    createPromoCodeDto: CreatePromoCodeDto,
  ): Promise<AppSuccess<PromoCode>> {
    const { code, ...reset } = createPromoCodeDto;

    const promoCode = code ?? Random(6);

    const newPromoCode = await this.prisma.promoCode.create({
      data: {
        ...reset,
        code: promoCode,
        expiredAt: new Date(reset.expiredAt),
      },
    });
    return new AppSuccess(newPromoCode, 'Promo code created successfully');
  }

  async getAllPromoCode(): Promise<AppSuccess<PromoCode[]>> {
    const promoCode = await this.prisma.promoCode.findMany();
    return new AppSuccess(promoCode, 'Promo code list');
  }

  async validatePromoCode(promoCode: string): Promise<AppSuccess<PromoCode>> {
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
        `Promo code ${promoCode} is invalid or expired.`,
      );
    }

    return new AppSuccess(validPromoCode, 'Promo code is valid');
  }
}
