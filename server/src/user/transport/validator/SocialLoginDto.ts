import { IsNotEmpty } from 'class-validator';

/**
 * Describes a contaienr for social network association
 */
export class SocialLoginDto {
  /**
   * Authorization code returned by OAuth server
   */
  @IsNotEmpty()
  public code: string;
}
