import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductImageEntity } from './entities/product-image.entity';

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
    productEntity.name = createProductDto.name;
    productEntity.price = createProductDto.price;
    productEntity.stock = createProductDto.stock;
    productEntity.description = createProductDto.description;

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

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
