import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductEmageEntity } from './image.entity';
import { ProducCategoryEntity } from './category.entity';
import { ProducCharacteristicEntity } from './characteristics.entity';

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ name: 'name', length: 100, nullable: false })
  name: string;
  @Column({ name: 'price', nullable: false })
  price: number;
  @Column({ name: 'quantity', nullable: false })
  quantity: number;
  @Column({ name: 'description', length: 255, nullable: false })
  description: string;

  @Column({ name: 'category', length: 100, nullable: false })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  @OneToMany(() => ProductEmageEntity, (image) => image.product, {
    cascade: true,
    eager: true,
  })
  images: ProductEmageEntity[];

  @OneToMany(
    () => ProducCharacteristicEntity,
    (characteristics) => characteristics.product,
    {
      cascade: true,
      eager: true,
    },
  )
  characteristics: ProducCharacteristicEntity[];

  @ManyToMany(() => ProducCategoryEntity, (category) => category.product, {
    eager: true,
    cascade: true,
  })
  @JoinTable()
  category: ProducCategoryEntity[];
}
