import { Module } from '@nestjs/common';
import { UserModule } from './user/User.module';

@Module({
  imports: [UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
