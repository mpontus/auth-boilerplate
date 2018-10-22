/**
 * DTO for completing password reset
 */
export interface PasswordResetCompleteDto {
  token: string;
  password: string;
}
