import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';

/**
 * Session entity
 *
 * Responsible for associating secure token with user entity.
 */
@Entity('sessions')
export class Session {
  /**
   * Randomly generated secure token
   */
  @PrimaryColumn()
  public token: string;

  /**
   * Reference to the user entity
   */
  @ManyToOne(() => User, { cascade: true, onDelete: 'CASCADE' })
  public user: User;
}
