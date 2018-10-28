import { Module } from '@nestjs/common';
import { CQRSModule } from '@nestjs/cqrs';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from 'nestjs-config';
import { Session } from './data/entity/session.entity';
import { User } from './data/entity/user.entity';
import { MailerService } from './data/service/mailer.service';
import { SessionService } from './data/service/session.service';
import { UserService } from './data/service/user.service';
import { AuthController } from './transport/controller/auth.controller';
import { EmailController } from './transport/controller/email.controller';
import { UserController } from './transport/controller/user.controller';
import { IsEmailUnique } from './transport/validator/is-email-unique.validator';

/**
 * User module
 *
 * Reponsible for authentication and user management.
 */
@Module({
  controllers: [AuthController, EmailController, UserController],
  imports: [
    CQRSModule,
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
  providers: [UserService, SessionService, MailerService, IsEmailUnique],
})
export class UserModule {}
