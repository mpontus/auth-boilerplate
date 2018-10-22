/**
 * Describes an update to user's profile
 */
interface ProfileUpdateDto {
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

  /**
   * Current user password
   */
  currentPassword?: string;
}
