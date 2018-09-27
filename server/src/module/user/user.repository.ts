import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { User } from './domain/model/User';
import { SignupDto } from './domain/model/SignupDto';

export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async create({ name, email, passwordHash }: Partial<User>) {
    const userEntity = this.userRepository.create({
      name,
      email,
      passwordHash,
    });

    await this.userRepository.save(userEntity);

    return new User(userEntity);
  }

  public async findByEmail(email: string): Promise<User> {
    const userEntity = await this.userRepository.findOne({ email });

    return new User(userEntity);
  }
}
