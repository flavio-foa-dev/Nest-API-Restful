import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity('product_characteristics')
export class ProducCharacteristicEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ name: 'name', length: 100, nullable: false })
  name: string;
  @Column({ name: 'description', length: 255, nullable: false })
  description: string;

  @ManyToOne(() => ProductEntity, (product) => product.images, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  product: ProductEntity;
}
