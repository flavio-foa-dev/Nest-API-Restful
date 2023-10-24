import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AuthGuard, RequestUser } from 'src/auth/auth.guard';
@UseGuards(AuthGuard)
@Controller('api/orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Req() req: RequestUser, @Body() data: CreateOrderDto) {
    const userId = req.user.sub;
    return this.orderService.create(userId, data);
  }

  @Get()
  findAll(@Req() req: RequestUser) {
    const role = req.user.role;
    console.log('ADMIM SOMENTE, seu role:', role);
    return this.orderService.findAll();
  }

  @Get('/myorders')
  findOne(@Req() req: RequestUser) {
    const userId = req.user.sub;
    return this.orderService.findOne(userId);
  }

  @Put('/:id')
  async update(
    @Req() req: RequestUser,
    @Param('id') orderId: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    const userId = req.user.sub;
    return this.orderService.update(orderId, updateOrderDto, userId);
  }
}
