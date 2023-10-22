import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
// import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { APP_FILTER } from '@nestjs/core';
import { FilterExceptionHTTP } from './error/filter-exception';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';

import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    OrderModule,
    ProductModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // CacheModule.register({ isGlobal: true, ttl: 10000 }),
    CacheModule.registerAsync({
      useFactory: async () => ({
        store: await redisStore({ ttl: 10 * 1000 }),
      }),
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: FilterExceptionHTTP,
    },
  ],
})
export class AppModule {}
