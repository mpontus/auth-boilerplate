import { User } from './User';

export interface UpdatePasswordDto {
  user: User;

  passwordHash: string;
}
