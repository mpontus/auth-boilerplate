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
export class PasswordRecoveryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @ManyToOne(_ => UserEntity, { onDelete: 'CASCADE' })
  user: UserEntity;

  @Column()
  expires: Date;
}
