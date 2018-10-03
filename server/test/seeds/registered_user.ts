import { getConnection } from 'typeorm';
import { UserEntity } from '../../src/module/user/user.entity';

export const id = 123;
export const email = 'Toby38@gmail.com';
export const passwordHash =
  '$2b$06$S5uyAfnGridPcLUdsR.Uq.QkZvg.4hPtgUPPYZLaqk.Pn5YzF5KTm';

export const run = () =>
  getConnection().manager.insert(UserEntity, {
    id,
    email,
    passwordHash,
  });
