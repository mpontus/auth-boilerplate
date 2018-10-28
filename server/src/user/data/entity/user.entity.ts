import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * User entity
 */
@Entity('users')
@Index(['email'])
export class User {
  /**
   * Randomly generated ID
   */
  @PrimaryColumn()
  public id: string;

  /**
   * Whether the user is anonymous
   */
  @Column('boolean')
  public isAnonymous: boolean = false;

  /**
   * User roles, e.g. "user", "admin"
   */
  @Column('json')
  public roles: string[] = [];

  /**
   * User display name
   */
  @Column()
  public name: string = '';

  /**
   * User email address
   */
  @Column()
  public email: string = '';

  /**
   * Flag indicates whether user has verified their email
   */
  @Column()
  public emailVerified: boolean = false;

  /**
   * User's hassed password
   */
  @Column()
  public passwordHash: string = '';

  /**
   * Timestamp of the profile creation
   */
  @CreateDateColumn()
  public createdDate: Date;

  /**
   * Timestamp of the last profile modification
   */
  @UpdateDateColumn()
  public updatedDate: Date;
}
