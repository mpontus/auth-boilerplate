import { Module } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from 'nestjs-config';
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
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get('env.database_url'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User, Session]),
  ],
  controllers: [AuthController, EmailController],
  providers: [
    {
      provide: ClientProxy,
      useFactory: (config: ConfigService) =>
        ClientProxyFactory.create({
          transport: Transport.REDIS,
          options: {
            url: config.get('env.redis_url'),
          },
        }),
      inject: [ConfigService],
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
