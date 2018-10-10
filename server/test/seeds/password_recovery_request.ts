import dayjs from 'dayjs';
import { getConnection } from 'typeorm';
import { UserEntity } from '../../src/user/data/user/UserEntity';
import { PasswordRecoveryEntity } from '../../src/user/data/passwordRecovery/PasswordRecoveryEntity';

export const userId = 123;
export const userEmail = 'Fannie.Brekke88@gmail.com';
export const secret = '38169';

export const run = async () => {
  const { manager } = getConnection();

  const user = await manager.save(UserEntity, {
    id: userId,
    name: 'Victor Martinez',
    email: userEmail,
    passwordHash: 'kvg4#MXl)(',
  });

  await manager.save(PasswordRecoveryEntity, {
    token: secret,
    expires: dayjs()
      .add(5, 'day')
      .toDate(),
    user,
  });
};
