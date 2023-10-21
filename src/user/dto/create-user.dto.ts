import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { IsEmailUnique } from '../validation/email-unique.validator';

export class CreateUserDto {
  @IsNotEmpty()
  firstName: string;
  @IsNotEmpty()
  lastName: string;
  @IsEmail()
  @IsEmailUnique({ message: 'E-mail already registered' })
  email: string;
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W+).{6,30}$/, {
    message:
      'pelo menos uma letra minúscula, uma letra maiúscula, um dígito, um caractere especial e ter entre 8 e 14 caracteres',
  })
  password: string;
  recoverToken?: string | null;
}
