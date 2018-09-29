import { Strategy } from 'passport-google-oauth2';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ModuleConfig } from './ModuleConfig';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(ModuleConfig) private readonly config: ModuleConfig,
    @Inject(AuthService) private readonly authService: AuthService,
  ) {
    super({
      clientID: config.googleClientId,
      clientSecret: config.googleClientSecret,
      callbackURL: config.googleCallbackUrl,
    });
  }

  async validate(accessToken, refreshToken, profile) {
    return profile;
  }
}
