import { Injectable } from '@nestjs/common';
import { CreatePromoCodeDto } from './dto/create-promo-code.dto';
import { UpdatePromoCodeDto } from './dto/update-promo-code.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PromoCodeService {
  constructor(private readonly prisma: PrismaService) {}

  async createPromoCode(createPromoCodeDto: CreatePromoCodeDto) {
    const { code, ...reset } = createPromoCodeDto;

    const promoCode = code ?? this.generateRandomCode();

    return this.prisma.promoCode.create({
      data: {
        ...reset,
        code: promoCode,
        expiredAt: new Date(reset.expiredAt),
      },
    });
  }

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

  async getAllPromoCode() {
    return this.prisma.promoCode.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} promoCode`;
  }

  update(id: number, updatePromoCodeDto: UpdatePromoCodeDto) {
    return `This action updates a #${id} promoCode`;
  }

  remove(id: number) {
    return `This action removes a #${id} promoCode`;
  }
}
