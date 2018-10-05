import * as bcrypt from 'bcrypt';
import { Inject } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { SessionRepository } from './session.repository';
import { LoginDto } from './domain/model/LoginDto';
import { Session } from './domain/model/Session';
import { User } from './domain/model/User';
import { BadCredentialsError } from './exception/BadCredentialsError';

export class AuthService {
  constructor(
    @Inject(UserRepository) readonly userRepository: UserRepository,
    @Inject(SessionRepository)
    private readonly sessionRepository: SessionRepository,
  ) {}

  async authenticate(user: User): Promise<Session> {
    return await this.sessionRepository.create(user);
  }

  async createToken({ email, password }: LoginDto): Promise<Session> {
    const user = await this.userRepository.findByEmail(email);

    if (user == null) {
      throw new BadCredentialsError('Bad credentials');
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);

    if (!isValid) {
      throw new BadCredentialsError('Bad credentials');
    }

    return await this.sessionRepository.create(user);
  }

  async findUserByToken(token: string): Promise<User> {
    return this.sessionRepository.findUser(token);
  }
}
