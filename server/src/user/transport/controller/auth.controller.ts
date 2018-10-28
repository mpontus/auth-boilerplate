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
import { User } from '../../data/entity/user.entity';
import { SessionService } from '../../data/service/session.service';
import { AuthGuard } from '../guards/auth.guard';
import { TransformInterceptor } from '../interceptor/transform.interceptor';
import { Session } from '../serializer/session.serializer';
import { LoginDto } from '../validator/login-dto.validator';
import { SignupDto } from '../validator/signup-dto.validator';

/**
 * Auth controller
 *
 * Repsonsible for authenticating users with the website
 */
@Controller('auth')
@UsePipes(new ValidationPipe({ transform: true }))
export class AuthController {
  constructor(
    @Inject(SessionService) private readonly sessionService: SessionService,
  ) {}

  /**
   * Authenticate the user with existing account
   */
  @Post('login')
  @UseInterceptors(new TransformInterceptor(Session))
  public async login(@Body() { email, password }: LoginDto): Promise<Session> {
    return this.sessionService.login(email, password);
  }

  /**
   * Authenticate the user with anonymous user account
   */
  @Post('login/anonymous')
  @UseInterceptors(new TransformInterceptor(Session))
  public async loginAnonymously(): Promise<Session> {
    return await this.sessionService.loginAnonymously();
  }

  /**
   * Authenticate the user with new account
   */
  @Post('signup')
  @UseInterceptors(new TransformInterceptor(Session))
  public async signup(@Body() { name, email, password }: SignupDto): Promise<
    Session
  > {
    return this.sessionService.signup({ name, email, password });
  }

  /**
   * Destroy user session
   */
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
