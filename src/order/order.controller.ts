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

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(AuthGuard(), RolesGuard)
  @Get()
  async getAllOrders(@UserData('user') user: User, @Lang() lang: Language) {
    return this.orderService.getAllOrders(user.id, lang);
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(['ADMIN', 'CASHIER'])
  @Get('/getAllOrders')
  async getNewOrders(
    @Lang() lang: Language,
    @UserData('user') user: User,
    @Query('fromDate') from: string,
    @Query('toDate') to: string,
  ) {
    const today = new Date();
    const oneMonthBefore = new Date();
    oneMonthBefore.setMonth(today.getMonth() - 1);
    const fromDate = new Date(from ?? oneMonthBefore);
    const toDate = new Date(to ?? new Date());
    console.log(fromDate, toDate);
    return this.orderService.getAllOrdersDateRange(
      user,
      lang,
      fromDate,
      toDate,
    );
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(['BARBER'])
  @Get('/barber-orders')
  async getBarberOrders(
    @UserData('user') user: User,
    @Lang() lang: Language,
    @Query('orderDate') orderDate?: Date,
  ) {
    return this.orderService.GetBarberOrders(user.id, lang, orderDate);
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @Get('categories/:id')
  async getCategories(@Param('id') id: string, @Lang() lang: Language) {
    return this.orderService.getNonSelectedServices(id, lang);
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(['CASHIER'])
  @Get('/cashier')
  async getCashierOrders(
    @UserData('user') user: User,
    @Lang() lang: Language,
    @Query('fromDate') from: string,
    @Query('toDate') to: string,
  ) {
    const DateFrom = new Date(from ?? new Date());
    const DateTo = new Date(to ?? new Date());
    return this.orderService.getCashierOrders(user.id, lang, DateFrom, DateTo);
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(['ADMIN', 'CASHIER'])
  @Get('/paid-orders')
  async getPaidOrders(@Query('from') from: string, @Query('to') to: string) {
    const DateFrom = new Date(from ?? new Date());
    const DateTo = new Date(to ?? new Date());
    return this.orderService.billOrders(DateFrom, DateTo);
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(['ADMIN', 'CASHIER'])
  @Put('/paid-order/:id')
  async paidOrder(
    @Param('id') id: string,
    @UserData('user') user: User,
    @Body() body?: { discount?: number },
  ) {
    return this.orderService.paidOrder(id, user, body);
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @Put('/cancel-order/:id')
  async cancelOrder(@Param('id') id: string) {
    return this.orderService.cancelOrder(id);
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(['ADMIN', 'BARBER'])
  @Put('/start-order/:id')
  async startOrder(@Param('id') id: string) {
    return this.orderService.startOrder(id);
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(['ADMIN', 'BARBER'])
  @Put('/complete-order/:id')
  async completeOrder(@Param('id') id: string) {
    return this.orderService.completeOrder(id);
  }

  @UseGuards(AuthGuard(false), RolesGuard)
  @Post('/OrderDetails')
  async getOrderDetails(
    @Body() orderDto: CreateOrderDto,
    @UserData('user') user: User,
    @Lang() lang: Language,
  ) {
    return this.orderService.GetData(orderDto, user.id, lang);
  }

  @UseGuards(AuthGuard(false), RolesGuard)
  @Get('/slots')
  async getSlots(@Query() query: { date: string; barberId?: string }) {
    return this.orderService.getSlots(query.date, query.barberId);
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @Put('/:id')
  async updateOrder(
    @Body() updateOrderDto: UpdateOrderDto,
    @Param('id') id: string,
    @UserData('user') user: User,
  ) {
    return this.orderService.updateOrder(id, updateOrderDto, user.role);
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @Get(':id')
  async getOrderById(@Param('id') id: string) {
    return this.orderService.getOrderById(id);
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @Post()
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @UserData('user') user: User,
    @Lang() lang: Language,
  ) {
    return this.orderService.createOrder(createOrderDto, user.id, lang);
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(['ADMIN'])
  @Post('/generate-slot')
  async generateSlot(@Body() body: { start: number; end: number }) {
    const { start, end } = body;
    return this.orderService.generateSlot(start, end);
  }
}
