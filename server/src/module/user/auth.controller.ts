import {
  Controller,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
  ClassSerializerInterceptor,
  Post,
  Body,
} from '@nestjs/common';
import { LoginDto } from './domain/model/LoginDto';
import { Session } from './domain/model/Session';
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(new ValidationPipe({ transform: true }))
  async login(@Body() data: LoginDto): Promise<Session> {
    return await this.authService.createToken(data);
  }
}
