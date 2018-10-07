import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './data/user/UserEntity';
import { LinkEntity } from './data/user/LinkEntity';
import { UserRepository } from './data/user/UserRepository';
import { UserMapper } from './data/user/UserMapper';
import { SessionRepository } from './data/session/SessionRepository';
import { TokenRepository } from './data/token/TokenRepository';
import { SessionEntity } from './data/session/SessionEntity';
import { TokenEntity } from './data/token/TokenEntity';
import { UserService } from './domain/service/UserService';
import { AuthService } from './domain/service/AuthService';
import { MailService } from './domain/service/MailService';
import { AuthController } from './transport/AuthController';
import { HttpStrategy } from './transport/HttpStrategy';
import { GoogleStrategy } from './transport/GoogleStrategy';
import { ModuleConfig } from './ModuleConfig';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    TypeOrmModule.forFeature([LinkEntity]),
    TypeOrmModule.forFeature([SessionEntity]),
    TypeOrmModule.forFeature([TokenEntity]),
  ],
  controllers: [AuthController],
  providers: [
    UserService,
    AuthService,
    MailService,
    HttpStrategy,
    GoogleStrategy,
    UserRepository,
    SessionRepository,
    TokenRepository,
    UserMapper,
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
          entities: [UserEntity, LinkEntity, SessionEntity, TokenEntity],
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
