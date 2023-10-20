import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { In, Repository } from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { OrderStatus } from './enum/orderStatus';
import { UUID } from 'crypto';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderItemEntity } from './entities/order-item.entity';
import { ProductEntity } from '../product/entities/product.entity';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  private verifyOrder(data: CreateOrderDto, products: ProductEntity[]) {
    data.orderItems.forEach((itemOrder) => {
      const resultproduts = products.find(
        (item) => item.id === itemOrder.productId,
      );
      if (resultproduts === undefined) {
        throw new NotFoundException(
          `product not found id:${itemOrder.productId}`,
        );
      }
    });
  }

  async create(userId: UUID, data: CreateOrderDto) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (user === null) {
      throw new NotFoundException(`user not found #${userId}`);
    }
    const productsIds = data.orderItems.map((item) => item.productId);

    const productsRelations = await this.productRepository.findBy({
      id: In(productsIds),
    });

    const itemsOrderEntity = data.orderItems.map((item) => {
      const product = productsRelations.find(
        (product) => product.id === item.productId,
      );

      if (product === undefined) {
        throw new NotFoundException(`product not found id:${item.productId}`);
      }
      if (product.stock < item.quantity) {
        throw new BadRequestException(
          `not enough product in stock:${item.productId}`,
        );
      }

      const itemOrderEntity = new OrderItemEntity();

      itemOrderEntity.product = product;
      itemOrderEntity.price = product.price;
      itemOrderEntity.quantity = item.quantity;

      itemOrderEntity.product.stock -= item.quantity;
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

  async update(orderId: UUID, updateOrderDto: UpdateOrderDto) {
    const order = await this.orderRepository.findOneBy({ id: orderId });
    if (order === null) {
      throw new NotFoundException(`order not found #${orderId}`);
    }
    Object.assign(order, updateOrderDto);
    return await this.orderRepository.save(order);
  }
}
