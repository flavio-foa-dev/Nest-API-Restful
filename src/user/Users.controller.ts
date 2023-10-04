import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserRepository } from './User.repository';
import { SaveUserDTO } from './dto/SaveUser.dto';
import * as crypto from 'crypto';
import { ListUserDTO } from './dto/listUser.dto';
import { UpdateUserDTO } from './dto/UpdateUser.dto';

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
    const users = await this.usuarioRepository.getUsers();
    const userParse = users.map(
      (item) => new ListUserDTO(item.id, item.firstName, item.lastName),
    );
    return userParse;
  }

  @Put('/:id')
  async updateUser(@Param('id') id: string, @Body() data: UpdateUserDTO) {
    const response = await this.usuarioRepository.updateUser(id, data);
    console.log('Responseeee', id, response);
    return { message: 'User updated successfully' };
  }
}
