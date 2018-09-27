import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Token } from './token.entity';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { ProfileController } from './profile.controller';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Token]),
  ],
  controllers: [ProfileController, AuthController],
  providers: [UserService, AuthService],
})
export class UserModule {}
