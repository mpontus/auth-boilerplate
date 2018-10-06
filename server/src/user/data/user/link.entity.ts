import {
  Unique,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
@Unique(['user', 'provider'])
@Unique(['provider', 'providerId'])
export class LinkEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => UserEntity, { cascade: true, onDelete: 'CASCADE' })
  user: UserEntity;

  @Column()
  provider: string;

  @Column()
  providerId: string;
}
