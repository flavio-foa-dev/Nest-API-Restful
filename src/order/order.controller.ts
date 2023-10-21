import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';

import { UUID } from 'crypto';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('api/orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @UseGuards(AuthGuard)
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

  @Patch('/:id')
  async update(
    @Param('id') orderId: UUID,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.orderService.update(orderId, updateOrderDto);
  }
}
