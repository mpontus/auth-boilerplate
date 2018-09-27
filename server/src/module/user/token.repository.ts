import * as hat from 'hat';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { TokenEntity } from './token.entity';
import { User } from './domain/model/User';

export class TokenRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(TokenEntity)
    private readonly tokenRepository: Repository<TokenEntity>,
  ) {}

  async create(user: User): Promise<string> {
    const userEntity = await this.userRepository.findOne({ id: user.id });
    const tokenEntity = this.tokenRepository.create({
      user: userEntity,
      token: hat(),
    });

    await this.tokenRepository.save(tokenEntity);

    return tokenEntity.token;
  }

  async findUser(token: string): Promise<User> {
    const result = await this.tokenRepository.findOne(
      { token },
      { relations: ['user'] },
    );

    return new User(result.user);
  }
}
