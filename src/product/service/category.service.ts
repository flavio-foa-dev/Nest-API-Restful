import { Injectable } from '@nestjs/common';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Repository } from 'typeorm';
import { ProducCategoryEntity } from '../entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(ProducCategoryEntity)
    private readonly categoryRepository: Repository<>,
  ) {}
  async create(createcategoryDto) {
    const newCategory = await this.categoryRepository.create(createcategoryDto);
    return newCategory;
  }

  findAll() {
    const categories = this.categoryRepository.findAll();
    return categories;
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
