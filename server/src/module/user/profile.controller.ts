import { Controller, Get, Post, UseGuards, Req, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';

interface SignupDto {
  name: string;
  email: string;
  password: string;
}

@Controller('profile')
export class ProfileController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard('bearer'))
  async profile(@Req() req) {
    return req.user;
  }

  @Post()
  async signup(@Body() data: SignupDto) {
    return await this.userService.signup(data);
  }
}
