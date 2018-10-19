import { Module } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from 'nestjs-config';
import { Session } from './data/entity/Session.entity';
import { User } from './data/entity/User.entity';
import { MailerService } from './data/service/MailerService';
import { SessionService } from './data/service/SessionService';
import { UserService } from './data/service/UserService';
import { AuthController } from './transport/controller/AuthController';
import { EmailController } from './transport/controller/EmailController';
import { UserController } from './transport/controller/UserController';
import { IsEmailUnique } from './transport/validator/IsEmailUnique';

/**
 * User module
 *
 * Reponsible for authentication and user management.
 */
@Module({
  controllers: [AuthController, EmailController, UserController],
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService): TypeOrmModuleOptions => ({
        type: 'postgres',
        url: config.get('env.database_url'),
        entities: [`${__dirname}/**/*.entity{.ts,.js}`],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User, Session]),
  ],
  providers: [
    {
      provide: ClientProxy,
      useFactory: (config: ConfigService): ClientProxy =>
        ClientProxyFactory.create({
          transport: Transport.REDIS,
          options: {
            url: config.get('env.redis_url'),
          },
        }),
      inject: [ConfigService],
    },
    UserService,
    SessionService,
    MailerService,
    IsEmailUnique,
  ],
})
export class UserModule {}
