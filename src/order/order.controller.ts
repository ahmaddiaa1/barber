import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UserData } from '../../decorators/user.decoretor';
import { User } from '@prisma/client';
import { AuthGuard } from '../../guard/auth.guard';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async getAllOrders() {
    return this.orderService.getAllOrders();
  }

  @Get('/slots')
  async getSlots(@Query('date') date: string) {
    return this.orderService.getSlots(date);
  }

  @Get(':id')
  async getOrderById(id: string) {
    return this.orderService.getOrderById(id);
  }

  @Get('/booked/slots')
  async getBookedSlots(@Query('date') date: Date) {
    return this.orderService.getBookedSlots(date);
  }

  @UseGuards(AuthGuard)
  @Post()
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @UserData('user') user: User,
  ) {
    return this.orderService.createOrder(createOrderDto, user.id);
  }

  @Post('/generate-slot')
  async generateSlot(@Body() body: { start: number; end: number }) {
    const { start, end } = body;
    return this.orderService.generateSlot(start, end);
  }
}
