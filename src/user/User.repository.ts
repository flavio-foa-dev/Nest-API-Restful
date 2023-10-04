import { Injectable } from '@nestjs/common';

import { IUser } from './interface/User.entity';

@Injectable()
export class UserRepository {
  private users: IUser[] = [];

  async save(user: IUser) {
    this.users.push(user);
  }

  async getUsers() {
    return this.users;
  }

  async emailExist(email: string) {
    const emailParse = email.trim();
    const output = await this.users.find((user) => user.email === emailParse);
    return output !== undefined;
  }
}
