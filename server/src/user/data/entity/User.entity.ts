import {
  Entity,
  Index,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { SocialLogin } from './SocialLogin.entity';

@Entity('users')
@Index(['email'])
export class User {
  @PrimaryColumn()
  id: string;

  @Column('boolean')
  isAnonymous: boolean = false;

  @Column('json')
  roles: string[] = [];

  @Column()
  name: string = '';

  @Column()
  email: string = '';

  @Column()
  emailVerified: boolean = false;

  @Column()
  passwordHash: string = '';

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @OneToMany(_ => SocialLogin, socialLogin => socialLogin.user)
  socialLogins: SocialLogin[];
}
