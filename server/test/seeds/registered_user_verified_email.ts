import * as bcrypt from 'bcrypt';
import { getConnection } from 'typeorm';
import { User } from '../../src/user/data/entity/user.entity';

export const id = '7435683745';
export const name = 'Brian Foster';
export const email = 'mitchell97@jones-smith.net';
export const password = 'x6tnBEr4&i';
export const passwordHash = bcrypt.hashSync(password, 6);

export const run = () =>
  getConnection().manager.save(
    User,
    getConnection().manager.create(User, {
      id,
      name,
      email,
      passwordHash,
      emailVerified: true,
    }),
  );
