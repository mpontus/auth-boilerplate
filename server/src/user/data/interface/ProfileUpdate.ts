/**
 * Profile update DTO
 */
export interface ProfileUpdate {
  /**
   * Current user password
   *
   * May be required to confirm email or password change
   */
  currentPassword?: string;

  /**
   * New user name
   */
  name?: string;

  /**
   * New user email
   */
  email?: string;

  /**
   * New user password
   */
  password?: string;
}
