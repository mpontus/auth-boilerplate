import { Unique, Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@Unique(['email'])
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  passwordHash: string;
}
