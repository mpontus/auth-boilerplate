import {
  Controller,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
  ClassSerializerInterceptor,
  Post,
  Get,
  Req,
  Body,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './domain/model/LoginDto';
import { Session } from './domain/model/Session';
import { RecoverPasswordDto } from './domain/model/RecoverPasswordDto';
import { ResetPasswordDto } from './domain/model/ResetPasswordDto';
import { UserService } from './user.service';
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(new ValidationPipe({ transform: true }))
  async login(@Body() data: LoginDto): Promise<Session> {
    return await this.authService.createToken(data);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleSingup(@Req() req) {
    return this.authService.authenticate(req.user);
  }

  @Post('password_recovery')
  @UsePipes(new ValidationPipe({ transform: true }))
  async passwortRecovery(@Body() { email }: RecoverPasswordDto) {
    await this.userService.recoverPassword({ email });
  }

  @Post('reset_password')
  @UsePipes(new ValidationPipe({ transform: true }))
  async resetPassword(@Body() { email, secret, password }: ResetPasswordDto) {
    await this.userService.resetPassword({ email, secret, password });
  }
}
