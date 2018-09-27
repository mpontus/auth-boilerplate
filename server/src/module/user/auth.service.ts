import * as bcrypt from 'bcrypt';
import { Inject } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { TokenRepository } from './token.repository';
import { User } from './domain/model/User';
import { BadCredentialsError } from './exception/BadCredentialsError';

// TODO: Validate createTokenDTO
interface CreateTokenDto {
  email: string;
  password: string;
}

export class AuthService {
  constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository,
    @Inject(TokenRepository) private readonly tokenRepository: TokenRepository,
  ) {}

  async createToken({ email, password }: CreateTokenDto): Promise<string> {
    const user = await this.userRepository.findByEmail(email);

    if (user == null) {
      throw new BadCredentialsError('Bad credentials');
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);

    if (!isValid) {
      throw new BadCredentialsError('Bad credentials');
    }

    return await this.tokenRepository.create(user);
  }

  async findUserByToken(token: string): Promise<User> {
    return this.tokenRepository.findUser(token);
  }
}
