import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { EhEmailExist } from '../decorator/UsersExist';

export class SaveUserDTO {
  @IsNotEmpty()
  @MinLength(3)
  firstName: string;
  @IsNotEmpty()
  @MinLength(3)
  lastName: string;

  @IsEmail()
  @EhEmailExist({ message: 'Email already registered' })
  email: string;

  @MinLength(6)
  @MaxLength(12)
  password: string;
}
