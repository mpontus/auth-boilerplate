import { IsEmail, MaxLength } from 'class-validator';

/**
 * Defines an object with valid email addres
 */
export class EmailContainer {
  /**
   * Email address
   */
  @IsEmail()
  @MaxLength(255)
  public email: string;
}
