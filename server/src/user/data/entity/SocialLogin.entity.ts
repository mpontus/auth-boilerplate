import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { User } from './User.entity';

@Entity('social_logins')
@Unique(['provider', 'providerId'])
export class SocialLogin {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public provider: string;

  @Column()
  public providerId: string;

  @ManyToOne(() => User, user => user.socialLogins)
  public user: User;
}
