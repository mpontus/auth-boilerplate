import * as hat from 'hat';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Token } from './token.entity';
import { BadCredentialsError } from './exception/BadCredentialsError';

interface CreateTokenDto {
  email: string;
  password: string;
}

export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {}

  async createToken({ email, password }: CreateTokenDto): Promise<string> {
    const user = await this.userRepository.findOne({ email });

    if (user == null) {
      throw new BadCredentialsError('Bad credentials');
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new BadCredentialsError('Bad credentials');
    }

    const token = hat();

    await this.tokenRepository.save(
      this.tokenRepository.create({ user, token }),
    );

    return token;
  }
}
