import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './User.entity';
import { Repository } from 'typeorm';
import { ListUserDTO } from './dto/listUser.dto';

export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getAllUsers() {
    const users = await this.userRepository.find();
    const listUsers = users.map((user) => {
      new ListUserDTO(user.id, user.firstName, user.lastName);
    });
    return listUsers;
  }
}
