import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { IsEmailUnique } from '../validation/email-unique.validator';

export class CreateUserDto {
  @IsNotEmpty()
  firstName: string;
  @IsNotEmpty()
  lastName: string;
  @IsEmail()
  @IsEmailUnique({ message: 'E-mail already registered' })
  email: string;
  @MinLength(8)
  password: string;
  passwordConfirmation: string;
}
