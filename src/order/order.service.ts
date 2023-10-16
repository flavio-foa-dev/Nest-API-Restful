import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { OrderStatus } from './enum/orderStatus';
import { UUID } from 'crypto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(userId: UUID) {
    const user = await this.userRepository.findOneBy({ id: userId });

    const orderEntity = new OrderEntity();
    orderEntity.total = 10;
    orderEntity.status = OrderStatus.PROCESSING;
    orderEntity.user = user;

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
