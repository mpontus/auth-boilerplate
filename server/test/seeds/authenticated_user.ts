import hat from 'hat';
import * as bcrypt from 'bcrypt';
import { getConnection } from 'typeorm';
import { User } from '../../src/user/data/entity/user.entity';
import { Session } from '../../src/user/data/entity/session.entity';

export const id = '847563';
export const name = 'Brian Foster';
export const email = 'Toby38@gmail.com';
export const password = 'H$4Dxli4R8';
export const passwordHash = bcrypt.hashSync(password, 6);
export const token = hat();

export const run = async () => {
  const { manager } = getConnection();

  const user = manager.create(User, {
    id,
    name,
    email,
    passwordHash,
  });

  const session = manager.create(Session, {
    user,
    token,
  });

  await manager.save(Session, session);
};
