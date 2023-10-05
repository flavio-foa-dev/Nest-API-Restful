import { Module } from '@nestjs/common';
import { UserModule } from './user/User.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfig } from './config/Postgres.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfig,
      inject: [PostgresConfig],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
