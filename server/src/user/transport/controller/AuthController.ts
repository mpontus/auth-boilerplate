import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SessionService } from '../../data/service/SessionService';
import { LoginDto } from '../validator/LoginDto';
import { SocialLoginDto } from '../validator/SocialLoginDto';
import { SignupDto } from '../validator/SignupDto';
import { Session } from '../serializer/Session';
import { TransformInterceptor } from '../interceptor/TransformInterceptor';
import { AuthGuard } from '../guards/AuthGuard';

@Controller('auth')
@UsePipes(new ValidationPipe({ transform: true }))
export class AuthController {
  constructor(
    @Inject(SessionService) private readonly sessionService: SessionService,
  ) {}

  @Post('login')
  @UseInterceptors(new TransformInterceptor(Session))
  login(@Body() { email, password }: LoginDto): Promise<Session> {
    return this.sessionService.login(email, password);
  }

  @Post('login/anonymous')
  @UseInterceptors(new TransformInterceptor(Session))
  async loginAnonymously(): Promise<Session> {
    return await this.sessionService.loginAnonymously();
  }

  @Post('signup')
  @UseInterceptors(new TransformInterceptor(Session))
  signup(@Body() { name, email, password }: SignupDto): Promise<Session> {
    return this.sessionService.signup({ name, email, password });
  }

  @Post('social/:provider')
  singupWithProvider(
    @Param('provider') provider: string,
    @Body() { code }: SocialLoginDto,
  ) {
    return this.sessionService.signupWithProvider(provider, code);
  }

  @Post('logout/:token')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.ACCEPTED)
  async logout(@Req() req: any, @Param('token') token: string): Promise<void> {
    await this.sessionService.logout(req.user, token);
  }
}
