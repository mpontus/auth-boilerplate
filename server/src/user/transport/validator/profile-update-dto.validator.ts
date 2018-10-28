import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { IsEmailUnique } from './is-email-unique.validator';

/**
 * Describes a profile update request
 */
export class ProfileUpdateDto {
  /**
   * New user name
   */
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(255)
  public name: string;

  /**
   * New user email address
   */
  @IsOptional()
  @IsEmail()
  @Validate(IsEmailUnique)
  @MaxLength(255)
  public email: string;

  /**
   * New user password
   */
  @IsOptional()
  @MinLength(6)
  public password: string;

  /**
   * User password
   */
  @IsOptional()
  @MinLength(6)
  public currentPassword: string;
}
