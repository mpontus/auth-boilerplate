import * as bcrypt from 'bcrypt';
import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

interface SignupDto {
  name: string;
  email: string;
  password: string;
}

export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  public async signup({ name, email, password }: SignupDto): Promise<User> {
    const userEntity = this.userRepository.create({
      name,
      email,
      // TODO: Extract salt rounds
      password: await bcrypt.hash(password, 5),
    });

    await this.userRepository.save(userEntity);

    console.log(await this.userRepository.find({}));

    return userEntity;
  }
}
