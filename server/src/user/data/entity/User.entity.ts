import {
  Entity,
  Unique,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { SocialLogin } from './SocialLogin.entity';

@Entity('users')
@Unique(['email'])
export class User {
  @PrimaryColumn()
  id: string;

  @Column('boolean')
  isAnonymous: boolean = true;

  @Column('json')
  roles: string[] = [];

  @Column()
  name: string = '';

  @Column()
  email: string = '';

  @Column()
  passwordHash: string = '';

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @OneToMany(_ => SocialLogin, socialLogin => socialLogin.user)
  socialLogins: SocialLogin[];
}
