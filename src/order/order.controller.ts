import { Controller, Get, Post, Query } from '@nestjs/common';
import { OrderService } from './order.service';

import { UUID } from 'crypto';

@Controller('api/orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Query('userId') userId: UUID) {
    return this.orderService.create(userId);
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
