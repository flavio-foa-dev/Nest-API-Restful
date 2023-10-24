import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from 'src/types/user-payload.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async login({ email, password }: CreateAuthDto) {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Email or password not valid');

    const userComparer = bcrypt.compareSync(password, user.password);
    if (!userComparer)
      throw new UnauthorizedException('Email or password not valid');

    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
    };
    return {
      token: await this.jwtService.signAsync(payload),
    };
  }
}
