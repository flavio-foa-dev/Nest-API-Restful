import { Module } from '@nestjs/common';
import { UserController } from './Users.controller';
import { UserRepository } from './User.repository';
import { EmailExistValidator } from './decorator/UsersExist';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserRepository, EmailExistValidator],
})
export class UserModule {}
