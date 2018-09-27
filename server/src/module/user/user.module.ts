import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';
import { SessionRepository } from './session.repository';
import { SessionEntity } from './session.entity';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { ProfileController } from './profile.controller';
import { AuthController } from './auth.controller';
import { HttpStrategy } from './http.strategy';

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
    UserRepository,
    SessionRepository,
  ],
})
export class UserModule {}
