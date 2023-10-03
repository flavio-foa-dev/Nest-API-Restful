import { Module } from '@nestjs/common';
import { UserController } from './Users.controller';
import { UserRepository } from './User.repository';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserRepository],
})
export class UserModule {}
