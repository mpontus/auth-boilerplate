import * as bcrypt from 'bcrypt';
import { getConnection } from 'typeorm';
import { UserEntity } from '../../src/user/data/user/user.entity';

export const id = 123;
export const email = 'Toby38@gmail.com';
export const password = 'H$4Dxli4R8';
export const passwordHash = bcrypt.hashSync(password, 6);

export const run = () =>
  getConnection().manager.insert(UserEntity, {
    id,
    email,
    passwordHash,
  });
