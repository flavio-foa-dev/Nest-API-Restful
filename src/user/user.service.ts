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
    const newUser = this.userRepository.create(userEntity);
    console.log(newUser, 'testando____create');
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

  update(id: UUID, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: UUID) {
    return this.userRepository.delete(id);
  }

  // async createAdminUser(createUserDto: CreateUserDto): Promise<User> {
  //   if (createUserDto.password != createUserDto.passwordConfirmation) {
  //     throw new UnprocessableEntityException('As senhas não conferem');
  //   } else {
  //     return this.userRepository.createUser(createUserDto, UserRole.ADMIN);
  //   }
  // }
}
