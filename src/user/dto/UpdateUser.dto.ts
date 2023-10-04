import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';
import { EhEmailExist } from '../decorator/UsersExist';

export class UpdateUserDTO {
  @IsNotEmpty()
  @MinLength(3)
  @IsOptional()
  firstName: string;

  @IsNotEmpty()
  @MinLength(3)
  @IsOptional()
  lastName: string;

  @IsEmail()
  @EhEmailExist({ message: 'Email already registered' })
  @IsOptional()
  email: string;

  @MinLength(6)
  @MaxLength(12)
  @IsOptional()
  password: string;
}
