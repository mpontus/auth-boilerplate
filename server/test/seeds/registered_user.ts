import * as bcrypt from 'bcrypt';
import { getConnection } from 'typeorm';
import { User } from '../../src/user/data/entity/user.entity';

export const id = '4398753495687346';
export const name = 'Chris Curtis';
export const email = 'Toby38@gmail.com';
export const password = 'H$4Dxli4R8';
export const passwordHash = bcrypt.hashSync(password, 6);

export const run = () =>
  getConnection().manager.save(
    User,
    getConnection().manager.create(User, {
      id,
      name,
      email,
      passwordHash,
    }),
  );
