import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UUID, randomBytes, randomUUID } from 'crypto';
import { UserEntity } from './entities/user.entity';
import { UserStatus } from './enum/user.status';
import { UserRole } from './enum/user.role';
import * as bcrypt from 'bcrypt';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = new UserEntity();
    user.id = randomUUID();
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.email = createUserDto.email;
    user.salt = await bcrypt.genSalt();
    user.confirmationToken = randomBytes(32).toString('hex');
    user.password = await this.hashPassword(createUserDto.password, user.salt);
    user.recoverToken = null;
    user.role = UserRole.USER;
    user.status = UserStatus.ACTIVE;

    const response = await this.userService.create(user);
    return { message: 'user created', response };
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: UUID) {
    return this.userService.findOne(id);
  }

  @Put('/:id')
  async update(@Param('id') id: UUID, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.userService.update(id, updateUserDto);

    return { user: user, message: ' User updated' };
  }

  @Delete('/:id')
  async remove(@Param('id') id: UUID) {
    return this.userService.remove(id);
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}