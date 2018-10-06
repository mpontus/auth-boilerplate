import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './data/user/user.entity';
import { LinkEntity } from './data/user/link.entity';
import { UserRepository } from './data/user/user.repository';
import { UserMapper } from './data/user/user.mapper';
import { SessionRepository } from './data/session/session.repository';
import { TokenRepository } from './data/token/token.repository';
import { SessionEntity } from './data/session/session.entity';
import { TokenEntity } from './data/token/token.entity';
import { UserService } from './domain/service/user.service';
import { AuthService } from './domain/service/auth.service';
import { MailService } from './domain/service/mail.service';
import { ProfileController } from './transport/profile.controller';
import { AuthController } from './transport/auth.controller';
import { HttpStrategy } from './transport/http.strategy';
import { GoogleStrategy } from './transport/google.strategy';
import { ModuleConfig } from './module.config';

interface ModuleOptions {
  providers: {
    google: {
      clientId: string;
      clientSecret: string;
      callbackUrl: string;
    };
  };
}

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    TypeOrmModule.forFeature([LinkEntity]),
    TypeOrmModule.forFeature([SessionEntity]),
    TypeOrmModule.forFeature([TokenEntity]),
  ],
  controllers: [ProfileController, AuthController],
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
  static create(options: ModuleConfig) {
    return {
      module: UserModule,
      providers: [
        {
          provide: ModuleConfig,
          useValue: new ModuleConfig(options),
        },
      ],
    };
  }
}
