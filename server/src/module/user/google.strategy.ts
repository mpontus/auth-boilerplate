import { Strategy } from 'passport-google-oauth2';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { ModuleConfig } from './ModuleConfig';
import { User } from './domain/model/User';

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
