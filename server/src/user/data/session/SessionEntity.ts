import {
  Unique,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { UserEntity } from '../user/UserEntity';

@Entity()
@Unique(['token'])
export class SessionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(_ => UserEntity, { onDelete: 'CASCADE' })
  user: UserEntity;

  @Column()
  token: string;
}
