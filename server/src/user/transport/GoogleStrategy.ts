import { Strategy } from 'passport-google-oauth2';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { UserService } from '../domain/service/UserService';
import { ModuleConfig } from '../ModuleConfig';
import { User } from '../domain/model/User';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(ModuleConfig) config: ModuleConfig,
    @Inject(UserService) private readonly userService: UserService,
  ) {
    super({
      clientID: config.googleClientId,
      clientSecret: config.googleClientSecret,
      callbackURL: config.googleCallbackUrl,
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: any,
  ): Promise<User> {
    return await this.userService.signupWithProvider(profile);
  }
}
