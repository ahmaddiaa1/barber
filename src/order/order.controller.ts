import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UserData } from '../../decorators/user.decorator';
import { Language, User } from '@prisma/client';
import { AuthGuard } from '../../guard/auth.guard';
import { RolesGuard } from 'guard/role.guard';
import { Roles } from 'decorators/roles.decorator';
import { Lang } from 'decorators/accept.language';
import { UpdateOrderDto } from './dto/update-order.dto';

@UseGuards(AuthGuard(false), RolesGuard)
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async getAllOrders(@UserData('user') user: User, @Lang() lang: Language) {
    return this.orderService.getAllOrders(user.id, lang);
  }

  @Roles(['BARBER'])
  @Get('/barber-orders')
  async getBarberOrders(
    @UserData('user') user: User,
    @Lang() lang: Language,
    @Query('orderDate') orderDate?: Date,
  ) {
    return this.orderService.GetBarberOrders(user.id, lang, orderDate);
  }

  @Get('categories/:id')
  async getCategories(@Param('id') id: string, @Lang() lang: Language) {
    return this.orderService.getNonSelectedServices(id, lang);
  }

  @Roles(['CASHIER'])
  @Get('/cashier')
  async getCashierOrders(@UserData('user') user: User, @Lang() lang: Language) {
    return this.orderService.getCashierOrders(user.id, lang);
  }

  @Roles(['ADMIN', 'CASHIER'])
  @Get('/paid-orders')
  async getPaidOrders(@Query('date') date: string) {
    return this.orderService.billOrders(date);
  }

  @Roles(['ADMIN', 'CASHIER'])
  @Put('/paid-order/:id')
  async paidOrder(@Param('id') id: string, @UserData('user') user: User) {
    return this.orderService.paidOrder(id, user.id);
  }

  @Put('/cancel-order/:id')
  async cancelOrder(@Param('id') id: string) {
    return this.orderService.cancelOrder(id);
  }

  @Roles(['ADMIN', 'BARBER'])
  @Put('/start-order/:id')
  async startOrder(@Param('id') id: string) {
    return this.orderService.startOrder(id);
  }

  @Roles(['ADMIN', 'BARBER'])
  @Put('/complete-order/:id')
  async completeOrder(@Param('id') id: string) {
    return this.orderService.completeOrder(id);
  }

  @Post('/OrderDetails')
  async getOrderDetails(
    @Body() orderDto: CreateOrderDto,
    @UserData('user') user: User,
    @Lang() lang: Language,
  ) {
    return this.orderService.GetData(orderDto, user.id, lang);
  }

  @Get('/slots')
  async getSlots(@Query('') query: { date: string; barberId: string }) {
    return this.orderService.getSlots(query.date, query.barberId);
  }

  @Put('/:id')
  async updateOrder(
    @Body() updateOrderDto: UpdateOrderDto,
    @Param('id') id: string,
    @UserData('user') user: User,
  ) {
    return this.orderService.updateOrder(id, updateOrderDto, user.role);
  }

  @Get(':id')
  async getOrderById(@Param('id') id: string) {
    return this.orderService.getOrderById(id);
  }

  @Post()
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @UserData('user') user: User,
    @Lang() lang: Language,
  ) {
    return this.orderService.createOrder(createOrderDto, user.id, lang);
  }

  @Roles(['ADMIN'])
  @Post('/generate-slot')
  async generateSlot(@Body() body: { start: number; end: number }) {
    const { start, end } = body;
    return this.orderService.generateSlot(start, end);
  }
}
