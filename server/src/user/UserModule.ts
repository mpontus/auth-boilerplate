import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './transport/controller/AuthController';
import { IsEmailUnique } from './transport/validator/IsEmailUnique';
import { SessionService } from './data/service/SessionService';
import { OAuthClient } from './oauth/OAuthClient';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { User } from './data/entity/User.entity';
import { Session } from './data/entity/Session.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Session]),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: OAuthClient,
      useValue: new OAuthClient(),
    },
    SessionService,
    IsEmailUnique,
  ],
})
export class UserModule {}
