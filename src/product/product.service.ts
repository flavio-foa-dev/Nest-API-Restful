import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductImageEntity } from './entities/product-image.entity';
import { UUID } from 'crypto';
import { EntityManager } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(ProductImageEntity)
    private readonly productImageRepository: Repository<ProductImageEntity>,
    private entityManager: EntityManager,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const result = await this.entityManager.transaction(
        async (transactionalEntityManager) => {
          const productEntity = new ProductEntity();
          productEntity.name = createProductDto.name;
          productEntity.price = createProductDto.price;
          productEntity.stock = createProductDto.stock;
          productEntity.description = createProductDto.description;

          const creteProduct = await transactionalEntityManager.save(
            ProductEntity,
            productEntity,
          );

          const createImages = createProductDto.images.map((item) => {
            const image = new ProductImageEntity();
            image.url = item.url;
            image.description = item.description;
            image.product = creteProduct;
            return image;
          });

          return await transactionalEntityManager.save(
            ProductImageEntity,
            createImages,
          );
        },
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    return this.productRepository.find();
  }

  async findOne(id: UUID) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) throw new NotFoundException(`product not found #${id}`);
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findOneBy({ id });
    if (product === null) {
      throw new NotFoundException(`product not found #${id}`);
    }
    Object.assign(product, updateProductDto as ProductEntity);

    await this.productRepository.save(product);
  }

  async remove(id: UUID) {
    await this.productRepository.delete(id);
  }
}
