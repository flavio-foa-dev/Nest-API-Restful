import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  login({ email, password }: CreateAuthDto) {
    console.log('meaagem de password', { email, password });
  }
}
