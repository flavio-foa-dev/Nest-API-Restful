import { Module } from '@nestjs/common';
import { ProductService } from './service/product.service';
import { ProductController } from './controller/product.controller';
import { CategoryService } from './service/category.service';
import { CategoryController } from './controller/category.controller';

@Module({
  controllers: [ProductController, CategoryController],
  providers: [ProductService, CategoryService],
})
export class ProductModule {}
