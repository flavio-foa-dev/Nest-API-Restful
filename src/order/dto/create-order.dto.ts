import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsUUID,
  ValidateNested,
} from 'class-validator';

class orderItemDTO {
  @IsUUID()
  productId: string;
  @IsInt()
  quantity: number;
}

export class CreateOrderDto {
  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => orderItemDTO)
  orderItems: orderItemDTO[];
}
