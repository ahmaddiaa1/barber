import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { AwsService } from 'src/aws/aws.service';
import { Random } from 'src/utils/generate';
import { AppSuccess } from 'src/utils/AppSuccess';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly awsService: AwsService,
  ) {}

  async createProduct(
    CreateProductDto: CreateProductDto,
    file: Express.Multer.File,
  ) {
    const { name, productImg, price, available } = CreateProductDto;

    const productImgUrl =
      file && (await this.awsService.uploadFile(file, Random(10), 'product'));

    const product = await this.prisma.product.create({
      data: {
        name,
        ...(productImgUrl && { productImg: productImgUrl }),
        price,
        available,
      },
    });

    return new AppSuccess(product, 'Product created successfully', 201);
  }

  async getAllProducts() {
    const products = await this.prisma.product.findMany();
    return new AppSuccess({ products }, 'Products fetched successfully', 200);
  }

  async getProductById(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return new AppSuccess(product, 'Product fetched successfully', 200);
  }

  async updateProduct(id: string, updateProductDto: UpdateProductDto) {
    const { name, productImg, price, available } = updateProductDto;

    const product = await this.prisma.product.update({
      where: { id },
      data: {
        name,
        productImg,
        price,
        available,
      },
    });

    return new AppSuccess(product, 'Product updated successfully', 200);
  }

  async deleteProduct(id: string) {
    const product = await this.prisma.product.delete({
      where: { id },
    });

    return new AppSuccess(product, 'Product deleted successfully', 200);
  }
}
