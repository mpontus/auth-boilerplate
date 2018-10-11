import {
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { User } from './User.entity';

@Entity('social_logins')
@Unique(['provider', 'providerId'])
export class SocialLogin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  provider: string;

  @Column()
  providerId: string;

  @ManyToOne(_ => User, user => user.socialLogins)
  user: User;
}
