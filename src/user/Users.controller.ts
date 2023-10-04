import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserRepository } from './User.repository';
import { SaveUserDTO } from './dto/SaveUser.dto';
import * as crypto from 'crypto';

@Controller('/api/users')
export class UserController {
  private usuarioRepository: UserRepository;
  constructor(usuarioRepository: UserRepository) {
    this.usuarioRepository = usuarioRepository;
  }
  @Post()
  async saveUser(@Body() user: SaveUserDTO) {
    const userEntity = {
      id: crypto.randomBytes(16).toString('hex'),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
    };
    this.usuarioRepository.save(userEntity);
    return { id: userEntity.id, message: 'User saved successfully' };
  }

  @Get()
  async getAllUsers() {
    return this.usuarioRepository.getUsers();
  }
}
