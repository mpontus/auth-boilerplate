/**
 * DTO for completing password reset
 */
export interface PasswordRecoveryCompleteDto {
  token: string;
  password: string;
}
