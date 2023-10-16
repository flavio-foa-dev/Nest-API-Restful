import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { OrderService } from './order.service';

import { UUID } from 'crypto';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('api/orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Query('userId') userId: UUID, @Body() data: CreateOrderDto) {
    return this.orderService.create(userId, data);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get('/search')
  findOne(@Query('userId') userId: UUID) {
    return this.orderService.findOne(userId);
  }
}
