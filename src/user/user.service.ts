import { Injectable } from '@nestjs/common';

import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UUID } from 'crypto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async create(userEntity: UserEntity) {
    const newUser = this.userRepository.create(userEntity);

    await this.userRepository.save(newUser);
  }

  async findAll() {
    const users = await this.userRepository.find();
    return users;
  }
  async findByEmail(email: string) {
    const checkEmail = await this.userRepository.findOne({
      where: { email: email },
    });
    return checkEmail;
  }

  async findOne(id: UUID) {
    const user = await this.userRepository.findOneBy({ id });
    return user;
  }

  update(id: UUID, data: any) {
    return this.userRepository.update(id, data);
  }

  remove(id: UUID) {
    return this.userRepository.delete(id);
  }
}
