import { Entity, PrimaryColumn, ManyToOne } from 'typeorm';
import { User } from './User.entity';

@Entity('sessions')
export class Session {
  @PrimaryColumn()
  token: string;

  @ManyToOne(_ => User, { cascade: true, onDelete: 'CASCADE' })
  user: User;
}
