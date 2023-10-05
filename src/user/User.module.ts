import { Module } from '@nestjs/common';
import { UserController } from './Users.controller';
import { UserRepository } from './User.repository';
import { EmailExistValidator } from './decorator/UsersExist';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './User.entity';
import { UserService } from './User.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, UserRepository, EmailExistValidator],
})
export class UserModule {}
