import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrderEntity } from './order.entity';

@Entity('order_items')
export class OrderItemEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'quantity', nullable: false })
  quantity: number;

  @Column({ name: 'price', nullable: false })
  price: number;

  @ManyToOne(() => OrderEntity, (order) => order.orderItem, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  order: OrderEntity;
}
