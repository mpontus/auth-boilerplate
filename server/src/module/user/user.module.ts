import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
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

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    TypeOrmModule.forFeature([SessionEntity]),
  ],
  controllers: [ProfileController, AuthController],
  providers: [
    UserService,
    AuthService,
    HttpStrategy,
    {
      provide: GoogleStrategy,
      useValue: new GoogleStrategy({
        clientID: process.env.GOOGLE_AUTH_CLIENT_ID,
        clientSecret: process.env.GOOGLE_AUTH_SECRET,
        callbackURL: process.env.GOOGLE_AUTH_CALLBACK_URL,
      }),
    },
    UserRepository,
    SessionRepository,
    {
      provide: CryptoService,
      useValue: new CryptoService(10),
    },
  ],
})
export class UserModule {}
