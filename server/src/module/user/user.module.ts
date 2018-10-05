import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { LinkEntity } from './link.entity';
import { UserRepository } from './user.repository';
import { SessionRepository } from './session.repository';
import { TokenRepository } from './token.repository';
import { SessionEntity } from './session.entity';
import { TokenEntity } from './token.entity';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { MailService } from './mail.service';
import { ProfileController } from './profile.controller';
import { AuthController } from './auth.controller';
import { HttpStrategy } from './http.strategy';
import { GoogleStrategy } from './google.strategy';
import { ModuleConfig } from './ModuleConfig';
import { UserMapper } from './user.mapper';

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
