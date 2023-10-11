import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity('product_categories')
export class ProducCategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ name: 'name', length: 50, nullable: false })
  name: string;

  @ManyToMany(() => ProductEntity, (product) => product.category, {})
  product: ProductEntity[];
}
