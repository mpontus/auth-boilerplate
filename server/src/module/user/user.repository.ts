import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { LinkEntity } from './link.entity';
import { User } from './domain/model/User';
import { SignupDto } from './domain/model/SignupDto';
import { SocialLoginDto } from './domain/model/SocialLoginDto';
import { UpdatePasswordDto } from './domain/model/UpdatePasswordDto';

export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(LinkEntity)
    private readonly linkRepository: Repository<LinkEntity>,
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
      return link.user;
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

    return new User(userEntity);
  }

  public async updatePassword({ user, passwordHash }: UpdatePasswordDto) {
    await this.userRepository.update(
      {
        id: user.id,
      },
      {
        passwordHash,
      },
    );
  }
}
