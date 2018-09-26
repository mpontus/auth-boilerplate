import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

interface SignupDto {
  name: string;
  email: string;
  password: string;
}

@Controller('profile')
export class ProfileController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async signup(@Body() data: SignupDto) {
    return await this.userService.signup(data);
  }
}
