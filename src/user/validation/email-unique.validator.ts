import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { UserService } from '../user.service';
import { Injectable } from '@nestjs/common';

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailUniqueValidator implements ValidatorConstraintInterface {
  constructor(private userService: UserService) {}
  async validate(value: any): Promise<boolean> {
    const userUnique = await this.userService.findByEmail(value);
    return !userUnique;
  }
}

export const IsEmailUnique = (option: ValidationOptions) => {
  return (objeto: object, properties: string) => {
    registerDecorator({
      target: objeto.constructor,
      propertyName: properties,
      options: option,
      constraints: [],
      validator: EmailUniqueValidator,
    });
  };
};
