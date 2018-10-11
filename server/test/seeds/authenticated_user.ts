import hat from 'hat';
import * as bcrypt from 'bcrypt';
import { getConnection } from 'typeorm';
import { User } from '../../src/user/data/entity/User.entity';
import { Session } from '../../src/user/data/entity/Session.entity';

export const id = '847563';
export const email = 'Toby38@gmail.com';
export const password = 'H$4Dxli4R8';
export const passwordHash = bcrypt.hashSync(password, 6);
export const token = hat();

export const run = async () => {
  const { manager } = getConnection();

  await manager.save(Session, {
    user: {
      id,
      email,
      passwordHash,
    },
    token,
  });
};
