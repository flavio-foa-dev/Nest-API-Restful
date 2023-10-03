import { Module } from '@nestjs/common';
import { UserController } from './Users.controller';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [],
})
export class UserModule {}
