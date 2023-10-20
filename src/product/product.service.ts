import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductImageEntity } from './entities/product-image.entity';
import { UUID } from 'crypto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(ProductImageEntity)
    private readonly productImageRepository: Repository<ProductImageEntity>,
  ) {}
  async create(createProductDto: CreateProductDto) {
    const productEntity = new ProductEntity();
    Object.assign(productEntity, <ProductEntity>createProductDto);

    const creteProduct = await this.productRepository.save(productEntity);

    const createImages = createProductDto.images.map((item) => {
      const image = new ProductImageEntity();
      image.url = item.url;
      image.description = item.description;
      image.product = creteProduct;
      return image;
    });

    const response = await this.productImageRepository.save(createImages);

    return response;
  }

  async findAll() {
    return this.productRepository.find();
  }

  async findOne(id: UUID) {
    return this.productRepository.findOneBy({ id });
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
