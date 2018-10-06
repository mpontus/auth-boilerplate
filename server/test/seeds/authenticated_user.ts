import hat from 'hat';
import * as bcrypt from 'bcrypt';
import { getConnection } from 'typeorm';
import { UserEntity } from '../../src/user/data/user/user.entity';
import { SessionEntity } from '../../src/user/data/session/session.entity';

export const id = 847563;
export const email = 'Toby38@gmail.com';
export const password = 'H$4Dxli4R8';
export const passwordHash = bcrypt.hashSync(password, 6);
export const token = hat();

export const run = async () => {
  const { manager } = getConnection();

  const userEntity = await manager.save(UserEntity, {
    id,
    email,
    passwordHash,
  });

  await manager.save(SessionEntity, {
    user: userEntity,
    token,
  });
};
