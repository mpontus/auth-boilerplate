import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './User.entity';

@Entity('sessions')
export class Session {
  @PrimaryColumn()
  public token: string;

  @ManyToOne(() => User, { cascade: true, onDelete: 'CASCADE' })
  public user: User;
}
