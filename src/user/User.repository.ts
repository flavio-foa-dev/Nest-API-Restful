import { Injectable } from '@nestjs/common';

import { IUser } from './interface/User.entity';
import { throwError } from 'rxjs';

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

  async updateUser(id: string, data: Partial<IUser>) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new Error(`User ${id} not found`);
    Object.entries(data).forEach(([key, value]) => {
      if (key === id) return;
      user[key] = value;
    });
    return user;
  }

  async deleteUser(id: string) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new Error(`User ${id} not found`);
    this.users = this.users.filter((user) => user.id !== id);

    return user;
  }
}
