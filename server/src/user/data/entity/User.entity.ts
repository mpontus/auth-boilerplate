import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { SocialLogin } from "./SocialLogin.entity";

@Entity("users")
@Index(["email"])
export class User {
  @PrimaryColumn()
  public id: string;

  @Column("boolean")
  public isAnonymous: boolean = false;

  @Column("json")
  public roles: string[] = [];

  @Column()
  public name: string = "";

  @Column()
  public email: string = "";

  @Column()
  public emailVerified: boolean = false;

  @Column()
  public passwordHash: string = "";

  @CreateDateColumn()
  public createdDate: Date;

  @UpdateDateColumn()
  public updatedDate: Date;

  @OneToMany((_) => SocialLogin, (socialLogin) => socialLogin.user)
  public socialLogins: SocialLogin[];
}
