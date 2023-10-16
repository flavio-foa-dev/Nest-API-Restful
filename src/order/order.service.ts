import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { OrderStatus } from './enum/orderStatus';
import { UUID } from 'crypto';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderItemEntity } from './entities/order-item.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(userId: UUID, data: CreateOrderDto) {
    const user = await this.userRepository.findOneBy({ id: userId });

    const itemsOrderEntity = data.orderItems.map((item) => {
      const itemOrderEntity = new OrderItemEntity();
      itemOrderEntity.price = 10;
      itemOrderEntity.quantity = item.quantity;
      return itemOrderEntity;
    });

    const totalPrice = itemsOrderEntity.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);

    const orderEntity = new OrderEntity();
    orderEntity.status = OrderStatus.PROCESSING;
    orderEntity.user = user;
    orderEntity.orderItem = itemsOrderEntity;
    orderEntity.total = totalPrice;

    const creteOrder = await this.orderRepository.save(orderEntity);
    return creteOrder;
  }

  async findAll() {
    const orders = await this.orderRepository.find();
    return orders;
  }

  async findOne(userId: UUID) {
    const order = await this.orderRepository.find({
      where: { user: { id: userId } },
      relations: {
        user: true,
      },
    });
    return order;
  }
}
