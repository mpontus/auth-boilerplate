import {
  Controller,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
  ClassSerializerInterceptor,
  Post,
  Patch,
  Get,
  Req,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
  UseFilters,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from '../domain/model/LoginDto';
import { SignupDto } from '../domain/model/SignupDto';
import { ProfileUpdateDto } from '../domain/model/ProfileUpdateDto';
import { User } from '../domain/model/User';
import { Session } from '../domain/model/Session';
import { RecoverPasswordDto } from '../domain/model/RecoverPasswordDto';
import { ResetPasswordDto } from '../domain/model/ResetPasswordDto';
import { UserService } from '../domain/service/UserService';
import { HttpExceptionFilter } from './HttpExceptionFilter';

@Controller('/auth')
@UseFilters(HttpExceptionFilter)
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(new ValidationPipe({ transform: true }))
  async login(@Body() { email, password }: LoginDto): Promise<Session> {
    return await this.userService.login(email, password);
  }

  @Post('password_recovery')
  @HttpCode(HttpStatus.ACCEPTED)
  @UsePipes(new ValidationPipe({ transform: true }))
  async passwortRecovery(@Body() { email }: RecoverPasswordDto) {
    await this.userService.recoverPassword(email);
  }

  @Post('reset_password')
  @UsePipes(new ValidationPipe({ transform: true }))
  @HttpCode(HttpStatus.ACCEPTED)
  async resetPassword(@Body() { secret, password }: ResetPasswordDto) {
    await this.userService.resetPassword(secret, password);
  }

  @Post('profile')
  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(new ValidationPipe({ transform: true }))
  async signup(@Body() { email, name, password }: SignupDto): Promise<Session> {
    return await this.userService.signup(name, email, password);
  }
}
