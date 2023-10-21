import { PipeTransform } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
export class HashPasswordPipe implements PipeTransform {
  constructor(private configService: ConfigService) {}
  async transform(password: string) {
    //const salt = this.configService.get<string>('SALT_PASS');
    const salt = bcrypt.genSaltSync(8);
    const hashPassword = await bcrypt.hash(password, salt);
    return { hashPassword, salt };
  }
}
