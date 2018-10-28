import { IsEmail, MaxLength, MinLength } from 'class-validator';

/**
 * Describes a container for user credentials
 */
export class LoginDto {
  /**
   * Email address
   */
  @IsEmail()
  @MaxLength(255)
  public email: string;

  /**
   * Password
   */
  @MinLength(6)
  public password: string;
}
