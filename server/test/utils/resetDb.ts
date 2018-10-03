import { createConnection } from 'typeorm';

const connection = createConnection({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [__dirname + '/../../src/**/*.entity{.ts,.js}'],
});

export const resetDb = async () => {
  await (await connection).synchronize(true);
};
