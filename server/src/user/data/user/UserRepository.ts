import { Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './UserEntity';
import { LinkEntity } from './LinkEntity';
import { UserMapper } from './UserMapper';
import { User } from '../../domain/model/User';
import { SignupDto } from '../../domain/model/SignupDto';
import { SocialLoginDto } from '../../domain/model/SocialLoginDto';
import { UpdatePasswordDto } from '../../domain/model/UpdatePasswordDto';

export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(LinkEntity)
    private readonly linkRepository: Repository<LinkEntity>,
    @Inject(UserMapper) private readonly userMapper: UserMapper,
  ) {}

  public async create({ name, email, passwordHash }: Partial<User>) {
    const userEntity = this.userRepository.create({
      name,
      email,
      passwordHash,
    });

    await this.userRepository.save(userEntity);

    return this.userMapper.transform(userEntity);
  }

  public async findByEmail(email: string): Promise<User | null> {
    const userEntity = await this.userRepository.findOne({ email });

    if (!userEntity) {
      return null;
    }

    return this.userMapper.transform(userEntity);
  }

  public async findOrCreateByLinkedAccount({
    provider,
    id,
    displayName,
  }: SocialLoginDto) {
    const link = await this.linkRepository.findOne(
      { provider, providerId: id },
      { relations: ['user'] },
    );

    if (link) {
      return this.userMapper.transform(link.user);
    }

    const userEntity = this.userRepository.create({
      name: displayName,
    });
    const linkEntity = this.linkRepository.create({
      user: userEntity,
      provider,
      providerId: id,
    });

    await this.userRepository.save(userEntity);
    await this.linkRepository.save(linkEntity);

    return this.userMapper.transform(userEntity);
  }

  public async updatePassword({ user, passwordHash }: UpdatePasswordDto) {
    await this.userRepository.update(
      {
        id: parseInt(user.id, 10),
      },
      {
        passwordHash,
      },
    );
  }

  public async save(user: User) {
    const { id, name, email, passwordHash } = user;

    await this.userRepository.update(
      {
        id: parseInt(id, 10),
      },
      { name, email, passwordHash },
    );
  }
}
