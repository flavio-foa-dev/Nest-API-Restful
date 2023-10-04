import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { UserRepository } from '../User.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailExistValidator implements ValidatorConstraintInterface {
  constructor(private userRepository: UserRepository) {}
  async validate(value: any): Promise<boolean> {
    const user = await this.userRepository.emailExist(value);
    return !user;
  }
}

export const EhEmailExist = (options: ValidationOptions) => {
  return (objeto: Object, property: string) => {
    registerDecorator({
      target: objeto.constructor,
      propertyName: property,
      options: options,
      constraints: [],
      validator: EmailExistValidator,
    });
  };
};
