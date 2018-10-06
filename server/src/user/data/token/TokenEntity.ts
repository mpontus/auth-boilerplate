import { Unique, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
@Unique(['secret', 'permission'])
export class TokenEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  permission: string;

  @Column()
  secret: string;

  @Column('bigint')
  expires: number;
}
