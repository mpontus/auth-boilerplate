import { Strategy } from 'passport-google-oauth2';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../domain/service/user.service';
import { ModuleConfig } from '../module.config';
import { User } from '../domain/model/User';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(ModuleConfig) private readonly config: ModuleConfig,
    @Inject(UserService) private readonly userService: UserService,
  ) {
    super({
      clientID: config.googleClientId,
      clientSecret: config.googleClientSecret,
      callbackURL: config.googleCallbackUrl,
    });
  }

  async validate(accessToken, refreshToken, profile): Promise<User> {
    return await this.userService.signupWithProvider(profile);
  }
}
