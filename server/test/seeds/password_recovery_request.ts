import { getConnection } from 'typeorm';
import { UserEntity } from '../../src/module/user/user.entity';
import { TokenEntity } from '../../src/module/user/token.entity';

export const userId = 123;
export const userEmail = 'Toby38@gmail.com';
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
