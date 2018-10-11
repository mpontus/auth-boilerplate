import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ValidatorConstraint, ValidationArguments } from 'class-validator';
import { User } from '../../data/entity/User.entity';

@ValidatorConstraint({ name: 'isUserAlreadyExist', async: true })
@Injectable()
export class IsEmailUnique {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async validate(email: string) {
    const userExists = await this.userRepository.findOne({ email });

    return !userExists;
  }

  defaultMessage(args: ValidationArguments) {
    return 'User with this email already exists.';
  }
}
