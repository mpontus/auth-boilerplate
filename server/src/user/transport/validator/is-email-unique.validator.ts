import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ValidationArguments, ValidatorConstraint } from 'class-validator';
import { Repository } from 'typeorm';
import { User } from '../../data/entity/user.entity';

/**
 * Custom validation constraint for email uniqueness
 */
@ValidatorConstraint({ name: 'isUserAlreadyExist', async: true })
@Injectable()
export class IsEmailUnique {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Check email address for uniqueness against existing user entities
   */
  public async validate(email: string): Promise<boolean> {
    const userExists = await this.userRepository.findOne({ email });

    return userExists === undefined;
  }

  /**
   * Default error message
   */
  public defaultMessage(_args: ValidationArguments): string {
    return 'User with this email already exists.';
  }
}
