import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserStatus } from '../enum/user.status';
import { OrderEntity } from '../../order/entities/order.entity';
import { Exclude } from 'class-transformer';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ name: 'firstName', nullable: false, type: 'varchar', length: 50 })
  firstName: string;
  @Column({ name: 'lastName', length: 50, nullable: false })
  lastName: string;
  @Column({ name: 'email', length: 50, nullable: false })
  email: string;
  @Exclude()
  @Column({ name: 'password', length: 255, nullable: false })
  password: string;
  @Exclude()
  @Column({ name: 'salt', length: 255, nullable: false })
  salt: string;

  @Exclude()
  @Column({
    name: 'confirmation_token',
    nullable: true,
    type: 'varchar',
    length: 64,
  })
  confirmationToken: string;

  @Exclude()
  @Column({
    name: 'recover_token',
    nullable: true,
    type: 'varchar',
    length: 64,
  })
  recoverToken: string;
  @Column({
    name: 'role',
    nullable: false,
    type: 'varchar',
    length: 20,
  })
  role: string;
  @Column({ name: 'status', enum: UserStatus, nullable: false, default: true })
  status: UserStatus;
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  updadedAt: Date;
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @OneToMany(() => OrderEntity, (order) => order.user)
  order: OrderEntity[];
}
