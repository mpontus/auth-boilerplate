import * as bcrypt from 'bcrypt';
import { Inject } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './domain/model/User';
import { SignupDto } from './domain/model/SignupDto';

export class UserService {
  constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository,
  ) {}

  public async signup({ name, email, password }: SignupDto): Promise<User> {
    return await this.userRepository.create({
      name,
      email,
      // TODO: Extract salt rounds
      passwordHash: await bcrypt.hash(password, 5),
    });
  }
}
