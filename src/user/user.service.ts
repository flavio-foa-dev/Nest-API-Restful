import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
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
    await this.userRepository.save(userEntity);
  }

  async findAll() {
    const users = await this.userRepository.find();
    return users;
  }

  async findOne(id: UUID) {
    const user = await this.userRepository.findOneBy({ id });
    return user;
  }

  update(id: UUID, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: UUID) {
    return this.userRepository.delete(id);
  }
}
