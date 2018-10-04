import { getConnection } from 'typeorm';

export const resetDb = async () => {
  await (await getConnection()).synchronize(true);
};
