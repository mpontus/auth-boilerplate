import {
  Unique,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
@Unique(['token'])
export class Token {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => User, { cascade: true, onDelete: 'CASCADE' })
  user: User;

  @Column()
  token: string;
}
