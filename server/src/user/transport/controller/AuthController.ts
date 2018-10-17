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
import { User } from '../../data/entity/User.entity';
import { SessionService } from '../../data/service/SessionService';
import { AuthGuard } from '../guards/AuthGuard';
import { TransformInterceptor } from '../interceptor/TransformInterceptor';
import { Session } from '../serializer/Session';
import { LoginDto } from '../validator/LoginDto';
import { SignupDto } from '../validator/SignupDto';
import { SocialLoginDto } from '../validator/SocialLoginDto';

@Controller('auth')
@UsePipes(new ValidationPipe({ transform: true }))
export class AuthController {
  constructor(
    @Inject(SessionService) private readonly sessionService: SessionService,
  ) {}

  @Post('login')
  @UseInterceptors(new TransformInterceptor(Session))
  public async login(@Body() { email, password }: LoginDto): Promise<Session> {
    return this.sessionService.login(email, password);
  }

  @Post('login/anonymous')
  @UseInterceptors(new TransformInterceptor(Session))
  public async loginAnonymously(): Promise<Session> {
    return await this.sessionService.loginAnonymously();
  }

  @Post('signup')
  @UseInterceptors(new TransformInterceptor(Session))
  public async signup(@Body() { name, email, password }: SignupDto): Promise<
    Session
  > {
    return this.sessionService.signup({ name, email, password });
  }

  @Post('social/:provider')
  public async singupWithProvider(
    @Param('provider') provider: string,
    @Body() { code }: SocialLoginDto,
  ) {
    return this.sessionService.signupWithProvider(provider, code);
  }

  @Post('logout/:token')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.ACCEPTED)
  public async logout(
    @Req() req: { user: User },
    @Param('token') token: string,
  ): Promise<void> {
    await this.sessionService.logout(req.user, token);
  }
}
