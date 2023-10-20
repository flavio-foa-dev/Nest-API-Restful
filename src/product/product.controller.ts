import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UUID } from 'crypto';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('/api/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get('/:id')
  @UseInterceptors(CacheInterceptor) // usando sistema de cache do nest, busca de um produto
  findOne(@Param('id') id: UUID) {
    const product = this.productService.findOne(id);
    console.log('Buscando produco, sistema de cache');
    return product;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: UUID) {
    return this.productService.remove(id);
  }
}
