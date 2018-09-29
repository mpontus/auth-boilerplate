import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { LinkEntity } from './link.entity';
import { UserRepository } from './user.repository';
import { SessionRepository } from './session.repository';
import { SessionEntity } from './session.entity';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { CryptoService } from './crypto.service';
import { ProfileController } from './profile.controller';
import { AuthController } from './auth.controller';
import { HttpStrategy } from './http.strategy';
import { GoogleStrategy } from './google.strategy';
import { ModuleConfig } from './ModuleConfig';

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
  ],
  controllers: [ProfileController, AuthController],
  providers: [
    UserService,
    AuthService,
    HttpStrategy,
    GoogleStrategy,
    UserRepository,
    SessionRepository,
    {
      provide: CryptoService,
      useValue: new CryptoService(10),
    },
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
