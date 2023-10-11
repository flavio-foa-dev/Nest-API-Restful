import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { ProductEntity } from '../entities/product.entity';
import { Type } from 'class-transformer';

export class CreateProducCategorytDto {
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  product: ProductEntity;
}

export class CreateProductCharacteristicDto {
  id: string;
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  product: ProductEntity;
}

export class CreateProductImageDto {
  id: string;

  @IsUrl()
  url: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsBoolean()
  mainImage: boolean;

  product: ProductEntity;
}

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @MaxLength(500, { message: 'Nao pode ter mais que 500 caracteres' })
  description: string;

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => CreateProductImageDto)
  images: CreateProductImageDto;

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => CreateProductCharacteristicDto)
  characteristics: CreateProductCharacteristicDto;

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => CreateProducCategorytDto)
  category: CreateProducCategorytDto;
}
