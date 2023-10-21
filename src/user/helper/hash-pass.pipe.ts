import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
export class HashPasswordPipe implements PipeTransform {
  transform(password: string, metadata: ArgumentMetadata) {
    return password;
  }
}
