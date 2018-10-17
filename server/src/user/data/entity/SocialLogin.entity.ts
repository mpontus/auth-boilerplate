import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { User } from './User.entity';

/**
 * Association between users and their social network profiles
 */
@Entity('social_logins')
@Unique(['provider', 'providerId'])
export class SocialLogin {
  /**
   * Unique ID of social profile association
   */
  @PrimaryGeneratedColumn()
  public id: number;

  /**
   * Provider code
   *
   * E.g. "google" or "twitter"
   */
  @Column()
  public provider: string;

  /**
   * Profile ID by provider
   */
  @Column()
  public providerId: string;

  /**
   * Associated user entity
   */
  @ManyToOne(() => User, user => user.socialLogins)
  public user: User;
}
