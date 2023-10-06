import { OrderEntity } from 'src/order/entities/order.entity';
import {
  Entity,
  CreateDateColumn,
  Column,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'firstName', length: 50, nullable: false })
  firstName: string;
  @Column({ name: 'lastName', length: 50, nullable: false })
  lastName: string;
  @Column({ name: 'email', length: 50, nullable: false })
  email: string;
  @Column({ name: 'password', length: 255, nullable: false })
  password: string;
  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;
  @UpdateDateColumn({ name: 'updated_at' })
  updadedAt: string;
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  @OneToMany(() => OrderEntity, (order) => order.user)
  order: OrderEntity[];
}
