import { Inject } from '@nestjs/common';
import { MailService } from './mail.service';
import { CryptoService } from './crypto.service';
import { UserRepository } from './user.repository';
import { TokenRepository } from './token.repository';
import { User } from './domain/model/User';
import { SignupDto } from './domain/model/SignupDto';
import { SocialLoginDto } from './domain/model/SocialLoginDto';
import { RecoverPasswordDto } from './domain/model/RecoverPasswordDto';
import { ResetPasswordDto } from './domain/model/ResetPasswordDto';
import { UserNotFoundError } from './domain/exception/UserNotFoundError';
import { InvalidTokenError } from './domain/exception/InvalidTokenError';

export class UserService {
  constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository,
    @Inject(TokenRepository) private readonly tokenRepository: TokenRepository,
    @Inject(CryptoService) private readonly cryptoService: CryptoService,
    @Inject(MailService) private readonly mailService: MailService,
  ) {}

  public async signup({ name, email, password }: SignupDto): Promise<User> {
    return await this.userRepository.create({
      name,
      email,
      passwordHash: await this.cryptoService.hash(password),
    });
  }

  public signupWithProvider(data: SocialLoginDto): Promise<User> {
    return this.userRepository.findOrCreateByLinkedAccount(data);
  }

  public async recoverPassword({ email }: RecoverPasswordDto): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UserNotFoundError();
    }

    const token = await this.tokenRepository.create({
      permission: `password_reset:${email}`,
      expires: Date.now() + 24 * 3600 * 1000,
    });

    await this.mailService.send({
      template: 'password_reset',
      recepient: user.email,
      data: {
        email: user.email,
        secret: token.secret,
      },
    });
  }

  public async resetPassword({
    secret,
    email,
    password,
  }: ResetPasswordDto): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UserNotFoundError();
    }

    const valid = await this.tokenRepository.claim({
      secret,
      permission: `password_reset:${email}`,
    });

    if (!valid) {
      throw new InvalidTokenError();
    }

    await this.userRepository.updatePassword({
      user,
      passwordHash: await this.cryptoService.hash(password),
    });
  }
}
