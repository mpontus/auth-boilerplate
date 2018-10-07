import { Inject } from '@nestjs/common';
import { UserNotFoundError } from '../exception/UserNotFoundError';
import { UserRepository } from '../abstract/UserRepository';
import { TokenRepository } from '../abstract/TokenRepository';
import { MailerService } from '../abstract/MailerService';

export class UserService {
  constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository,
    @Inject(TokenRepository) private readonly tokenRepository: TokenRepository,
    @Inject(MailerService) private readonly mailerService: MailerService,
  ) {}

  public async recoverPassword(email: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    if (user === null) {
      throw new UserNotFoundError();
    }

    const token = await this.tokenRepository.create(`password_reset:${email}`);

    await this.mailerService.send(email, 'password_recovery', {
      email,
      token: token.token,
    });
  }
}
