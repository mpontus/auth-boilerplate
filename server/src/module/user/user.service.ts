import { Inject } from '@nestjs/common';
import { CryptoService } from './crypto.service';
import { UserRepository } from './user.repository';
import { User } from './domain/model/User';
import { SignupDto } from './domain/model/SignupDto';
import { SocialLoginDto } from './domain/model/SocialLoginDto';

export class UserService {
  constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository,
    @Inject(CryptoService) private readonly cryptoService: CryptoService,
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
}
