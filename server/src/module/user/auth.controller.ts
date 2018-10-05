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
import { LoginDto } from './domain/model/LoginDto';
import { ProfileUpdateDto } from './domain/model/ProfileUpdateDto';
import { Session } from './domain/model/Session';
import { RecoverPasswordDto } from './domain/model/RecoverPasswordDto';
import { ResetPasswordDto } from './domain/model/ResetPasswordDto';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { HttpExceptionFilter } from './http-exception.filter';

@Controller('/auth')
@UseFilters(HttpExceptionFilter)
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
  @HttpCode(HttpStatus.ACCEPTED)
  @UsePipes(new ValidationPipe({ transform: true }))
  async passwortRecovery(@Body() { email }: RecoverPasswordDto) {
    await this.userService.recoverPassword({ email });
  }

  @Post('reset_password')
  @UsePipes(new ValidationPipe({ transform: true }))
  @HttpCode(HttpStatus.ACCEPTED)
  async resetPassword(@Body() { email, secret, password }: ResetPasswordDto) {
    await this.userService.resetPassword({ email, secret, password });
  }

  @Patch('profile')
  @HttpCode(HttpStatus.ACCEPTED)
  @UseGuards(AuthGuard('bearer'))
  async updateProfile(@Req() req, @Body() update: ProfileUpdateDto) {
    await this.userService.updateProfile(req.user, update);
  }
}
