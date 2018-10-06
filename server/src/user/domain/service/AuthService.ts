import * as bcrypt from 'bcrypt';
import { Inject } from '@nestjs/common';
import { UserRepository } from '../../data/user/UserRepository';
import { SessionRepository } from '../../data/session/SessionRepository';
import { LoginDto } from '../model/LoginDto';
import { Session } from '../model/Session';
import { User } from '../model/User';
import { BadCredentialsError } from '../exception/BadCredentialsError';

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
      throw new BadCredentialsError();
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);

    if (!isValid) {
      throw new BadCredentialsError();
    }

    return await this.sessionRepository.create(user);
  }

  async findUserByToken(token: string): Promise<User> {
    const user = await this.sessionRepository.findUser(token);

    if (user === null) {
      throw new BadCredentialsError();
    }

    return user;
  }
}
