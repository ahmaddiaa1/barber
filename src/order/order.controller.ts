import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UserData } from '../../decorators/user.decorator';
import { User } from '@prisma/client';
import { AuthGuard } from '../../guard/auth.guard';

@UseGuards(AuthGuard)
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async getAllOrders(@UserData('user') user: User) {
    return this.orderService.getAllOrders(user.id);
  }

  @Post('/paid-order/:id')
  async paidOrder(@Param('id') id: string) {
    return this.orderService.paidOrder(id);
  }

  @Post('/cancel-order/:id')
  async cancelOrder(@Param('id') id: string) {
    return this.orderService.cancelOrder(id);
  }

  @Post('/start-order/:id')
  async startOrder(@Param('id') id: string) {
    return this.orderService.startOrder(id);
  }

  @Post('/complete-order/:id')
  async completeOrder(@Param('id') id: string) {
    return this.orderService.completeOrder(id);
  }

  @Post('/OrderDetails')
  async getOrderDetails(
    @Body() orderDto: CreateOrderDto,
    @UserData('user') user: User,
  ) {
    return this.orderService.GetData(orderDto, user.id);
  }

  @Get('/slots')
  async getSlots(@Query('') query: { date: string; barberId: string }) {
    return this.orderService.getSlots(query.date, query.barberId);
  }

  @Get(':id')
  async getOrderById(@Param('id') id: string) {
    return this.orderService.getOrderById(id);
  }

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
