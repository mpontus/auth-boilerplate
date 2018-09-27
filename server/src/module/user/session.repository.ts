import * as hat from 'hat';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { SessionEntity } from './token.entity';
import { User } from './domain/model/User';

export class SessionRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(SessionEntity)
    private readonly sessionRepository: Repository<SessionEntity>,
  ) {}

  async create(user: User): Promise<string> {
    const userEntity = await this.userRepository.findOne({ id: user.id });
    const sessionEntity = this.sessionRepository.create({
      user: userEntity,
      token: hat(),
    });

    await this.sessionRepository.save(sessionEntity);

    return sessionEntity.token;
  }

  async findUser(token: string): Promise<User> {
    const result = await this.sessionRepository.findOne(
      { token },
      { relations: ['user'] },
    );

    return new User(result.user);
  }
}
