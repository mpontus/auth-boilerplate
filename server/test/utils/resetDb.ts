import { getConnection } from 'typeorm';

export const resetDb = async () => {
  await getConnection().synchronize(true);
};
