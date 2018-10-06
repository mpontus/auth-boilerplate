import { getConnection } from 'typeorm';
import { UserEntity } from '../../src/user/data/user/UserEntity';
import { TokenEntity } from '../../src/user/data/token/TokenEntity';

export const userId = 123;
export const userEmail = 'Fannie.Brekke88@gmail.com';
export const secret = '38169';

export const run = async () => {
  const { manager } = getConnection();

  await manager.insert(UserEntity, {
    id: userId,
    email: userEmail,
    passwordHash: '',
  });

  await manager.insert(TokenEntity, {
    permission: `password_reset:${userEmail}`,
    expires: Date.now() + 3600 * 1000,
    secret,
  });
};
