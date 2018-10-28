import hat from 'hat';
import * as bcrypt from 'bcrypt';
import { getConnection } from 'typeorm';
import { User } from '../../src/user/data/entity/user.entity';
import { Session } from '../../src/user/data/entity/session.entity';

export const id = '7536485';
export const name = 'Victor Martinez';
export const email = 'kmartinez@wright.com';
export const password = '71bPiFy8)g';
export const passwordHash = bcrypt.hashSync(password, 6);
export const token = hat();

export const run = async () => {
  const { manager } = getConnection();

  const user = manager.create(User, {
    id,
    name,
    email,
    passwordHash,
    roles: ['admin'],
  });

  const session = manager.create(Session, {
    user,
    token,
  });

  await manager.save(Session, session);
};
