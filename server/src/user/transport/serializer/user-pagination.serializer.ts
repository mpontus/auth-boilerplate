import { Exclude, Expose, Type } from 'class-transformer';
import { User } from './user.serializer';

/**
 * Serialized user list
 */
@Exclude()
export class UserPagination {
  /**
   * Total number of users in the database
   */
  @Expose()
  public total: number;

  /**
   * User entities included in the current page
   */
  @Expose()
  @Type(() => User)
  public items: User[];
}
