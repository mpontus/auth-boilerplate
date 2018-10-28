import { MinLength } from 'class-validator';

/**
 * Describes a container for a password
 */
export class PasswordContainer {
  /**
   * Password
   */
  @MinLength(6)
  public password: string;
}
