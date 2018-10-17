import { Exclude, Expose } from 'class-transformer';

/**
 * User serializer
 */
@Exclude()
export class User {
  /**
   * Expose user id
   */
  @Expose()
  public id: string;

  /**
   * Expose user name
   */
  @Expose()
  public name: string;
}
