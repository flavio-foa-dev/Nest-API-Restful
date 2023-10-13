import { Controller } from '@nestjs/common';

import { CategoryService } from '../service/category.service';

@Controller('api/categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
}
