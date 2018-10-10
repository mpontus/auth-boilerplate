import { Module } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './domain/service/UserService';
import { MailerService } from './domain/abstract/MailerService';
import { PasswordHasher } from './domain/abstract/PasswordHasher';
import { PasswordRecoveryRepository } from './domain/abstract/PasswordRecoveryRepository';
import { SessionRepository } from './domain/abstract/SessionRepository';
import { UserRepository } from './domain/abstract/UserRepository';
import { StubMailerService } from './data/email/StubMailerService';
import { DeferredMailerService } from './data/email/DeferredMailerService';
import { BcryptPasswordHasher } from './data/passwordHasher/BcryptPasswordHasher';
import { TypeormPasswordRecoveryRepository } from './data/passwordRecovery/TypeormPasswordRecoveryRepository';
import { TypeormSessionRepository } from './data/session/TypeormSessionRepository';
import { TypeormUserRepository } from './data/user/TypeormUserRepository';
import { UserEntity } from './data/user/UserEntity';
import { SessionEntity } from './data/session/SessionEntity';
import { PasswordRecoveryEntity } from './data/passwordRecovery/PasswordRecoveryEntity';
import { AuthController } from './transport/AuthController';
import { HttpStrategy } from './transport/HttpStrategy';
import { GoogleStrategy } from './transport/GoogleStrategy';
import { ModuleConfig } from './ModuleConfig';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    TypeOrmModule.forFeature([PasswordRecoveryEntity]),
    TypeOrmModule.forFeature([SessionEntity]),
  ],
  controllers: [AuthController],
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
      provide: UserRepository,
      useClass: TypeormUserRepository,
    },
    {
      provide: SessionRepository,
      useClass: TypeormSessionRepository,
    },
    {
      provide: PasswordRecoveryRepository,
      useClass: TypeormPasswordRecoveryRepository,
    },
    {
      provide: MailerService,
      useClass:
        // Connection to redis server not being closed after finishing tests
        process.env.NODE_ENV === 'test'
          ? StubMailerService
          : DeferredMailerService,
    },
    {
      provide: PasswordHasher,
      useClass: BcryptPasswordHasher,
    },
    UserService,
    HttpStrategy,
    GoogleStrategy,
  ],
})
export class UserModule {
  static create(options: Partial<ModuleConfig>) {
    return {
      module: UserModule,
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          url: options.databaseUrl,
          entities: [UserEntity, SessionEntity, PasswordRecoveryEntity],
          synchronize: true,
        }),
      ],
      providers: [
        {
          provide: ModuleConfig,
          useValue: new ModuleConfig(options),
        },
      ],
    };
  }
}
