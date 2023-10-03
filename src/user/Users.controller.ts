import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserRepository } from './User.repository';
import { SaveUserDTO } from './dto/SaveUser.dto';

@Controller('/api/users')
export class UserController {
  private usuarioRepository: UserRepository;
  constructor(usuarioRepository: UserRepository) {
    this.usuarioRepository = usuarioRepository;
  }
  @Post()
  async saveUser(@Body() user: SaveUserDTO) {
    this.usuarioRepository.save(user);
    return { user, message: 'User saved successfully' };
  }

  @Get()
  async getAllUsers() {
    return this.usuarioRepository.getUsers();
  }
}
