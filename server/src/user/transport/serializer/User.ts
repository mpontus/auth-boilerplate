import { Exclude, Expose } from 'class-transformer';

/**
 * User serializer
 *
 * Provides extensive details about the user, which should only be
 * visible to the user themself and admins.
 *
 * Front-end needs are taken into consideration when deciding which of
 * the user fields to expose.
 */
@Exclude()
export class User {
  /**
   * Expose user id
   */
  @Expose()
  public id: string;

  /**
   * Expose user display name to display session status
   */
  @Expose()
  public name: string;

  /**
   * Expose user email for profile updates
   */
  @Expose()
  public email: string;

  /**
   * Expose whether email is verified to display a reminder
   */
  @Expose()
  public emailVerified: boolean;

  /**
   * Expose user roles to constrain navigation options
   */
  @Expose()
  public roles: string[];
}
