import { Exclude, Expose, plainToClass, Transform } from 'class-transformer';
import { User } from './user.serializer';

/**
 * Session serializer
 */
@Exclude()
export class Session {
  /**
   * Secure session token
   */
  @Expose()
  public token: string;

  /**
   * User associated with the session
   *
   * Anonymous users are opaque and their sessions should not include
   * any identifiable details.
   */
  @Expose()
  @Transform(user => {
    if (user.isAnonymous) {
      return undefined;
    }

    return plainToClass(User, user);
  })
  public user?: User;
}
