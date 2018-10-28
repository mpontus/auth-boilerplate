import {
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { IsEmailUnique } from './is-email-unique.validator';

/**
 * Describes a container for sign up dtails
 */
export class SignupDto {
  /**
   * User display name
   */
  @IsNotEmpty()
  @MaxLength(255)
  public name: string;

  /**
   * User email address
   */
  @IsEmail()
  @Validate(IsEmailUnique)
  @MaxLength(255)
  public email: string;

  /**
   * User password
   */
  @MinLength(6)
  public password: string;
}
