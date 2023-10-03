import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserRepository } from './User.repository';

@Controller('/api/users')
export class UserController {
  private usuarioRepository = new UserRepository();
  @Post()
  async saveUser(@Body() user) {
    this.usuarioRepository.save(user);
    return { user, message: 'User saved successfully' };
  }

  @Get()
  async getAllUsers() {
    return this.usuarioRepository.getUsers();
  }
}
