import {
  Unique,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
@Unique(['token'])
export class SessionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => UserEntity, { cascade: true, onDelete: 'CASCADE' })
  user: UserEntity;

  @Column()
  token: string;
}
