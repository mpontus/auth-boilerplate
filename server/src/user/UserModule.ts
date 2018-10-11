import { Module } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './transport/controller/AuthController';
import { EmailController } from './transport/controller/EmailController';
import { IsEmailUnique } from './transport/validator/IsEmailUnique';
import { SessionService } from './data/service/SessionService';
import { MailerService } from './data/service/MailerService';
import { OAuthClient } from './oauth/OAuthClient';
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
  controllers: [AuthController, EmailController],
  providers: [
    {
      provide: ClientProxy,
      useValue: ClientProxyFactory.create({
        transport: Transport.REDIS,
        options: {
          url: process.env.REDIS_URL,
        },
      }),
    },
    {
      provide: OAuthClient,
      useValue: new OAuthClient(),
    },
    SessionService,
    MailerService,
    IsEmailUnique,
  ],
})
export class UserModule {}
