import {
  BadRequestException,
  ForbiddenException,
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

  async create(userId: string, data: CreateOrderDto) {
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
    orderEntity.total = totalPrice;
    orderEntity.status = OrderStatus.PROCESSING;
    orderEntity.user = user;
    orderEntity.orderItem = itemsOrderEntity;

    try {
      const createOrder = await this.orderRepository.save(orderEntity);
      return createOrder;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findAll() {
    const orders = await this.orderRepository.find();
    return orders;
  }

  async findOne(userId: string) {
    const order = await this.orderRepository.find({
      where: { user: { id: userId } },
      relations: {
        user: true,
      },
    });
    return order;
  }

  async update(
    orderId: string,
    updateOrderDto: UpdateOrderDto,
    userId: string,
  ) {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
      relations: { user: true, orderItem: true },
    });
    if (order === null) {
      throw new NotFoundException(`order not found #${orderId}`);
    }
    if (order.user.id !== userId) {
      throw new ForbiddenException(
        'You are not authorized to update this order',
      );
    }
    Object.assign(order, updateOrderDto);
    return await this.orderRepository.save(order);
  }
}
