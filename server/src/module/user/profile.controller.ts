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
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { UserJson } from './serializer/UserJson';
import { SignupDto } from './domain/model/SignupDto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(AuthGuard('bearer'))
  async profile(@Req() req): Promise<UserJson> {
    return new UserJson(req.user);
  }

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(new ValidationPipe({ transform: true }))
  async signup(@Body() data: SignupDto): Promise<UserJson> {
    return new UserJson(await this.userService.signup(data));
  }
}
