import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  async login({ email, password }: CreateAuthDto) {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException();

    const userComparer = bcrypt.compareSync(password, user.password);
    console.log('compare', userComparer);
    if (!userComparer) throw new UnauthorizedException();
    console.log('meaagem de password', { email, password, user });
  }
}
