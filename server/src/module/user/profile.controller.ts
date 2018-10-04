import {
  UseInterceptors,
  UsePipes,
  ValidationPipe,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseGuards,
  Req,
  Body,
  UseFilters,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { User } from './domain/model/User';
import { SignupDto } from './domain/model/SignupDto';
import { HttpExceptionFilter } from './http-exception.filter';

@Controller('profile')
@UseFilters(HttpExceptionFilter)
export class ProfileController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(AuthGuard('bearer'))
  async profile(@Req() req): Promise<User> {
    return req.user;
  }

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(new ValidationPipe({ transform: true }))
  async signup(@Body() data: SignupDto): Promise<User> {
    return await this.userService.signup(data);
  }
}
