import { createConnection, Connection, EntityManager } from 'typeorm';
import { TypeormUserRepository } from './TypeormUserRepository';

import { UserEntity } from './UserEntity';

let connection: Connection;
let manager: EntityManager;
let userRepository: TypeormUserRepository;

beforeAll(async () => {
  connection = await createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: [UserEntity],
  });

  manager = connection.manager;
  userRepository = new TypeormUserRepository(manager);
});

beforeEach(async () => {
  await connection.synchronize(true);
});

describe('findByEmail', () => {
  const email = 'ngallagher@cole-pearson.info';
  const name = 'Natalie Pope';
  const passwordHash = '71bPiFy8)g';

  describe('when the user does not exist', () => {
    it('should return null', async () => {
      expect(await userRepository.findByEmail(email)).toBe(null);
    });
  });

  describe('when user exists', () => {
    beforeEach(() => {
      manager.insert(UserEntity, {
        email,
        name,
        passwordHash,
      });
    });

    it('should find the user', async () => {
      expect(await userRepository.findByEmail(email)).toMatchObject({
        email,
        name,
        passwordHash,
      });
    });
  });
});

describe('save', () => {
  const email = 'ngallagher@cole-pearson.info';
  const name = 'Natalie Pope';
  const passwordHash = '71bPiFy8)g';

  describe('when the user does not exist', () => {
    let result: any;

    beforeEach(async () => {
      result = await userRepository.save({
        email,
        name,
        passwordHash,
      });
    });

    it('should create the user', async () => {
      expect(await manager.find(UserEntity, {})).toEqual([
        {
          id: expect.any(Number),
          email,
          name,
          passwordHash,
        },
      ]);
    });

    it('should return user entity', () => {
      expect(result).toEqual({
        id: expect.any(String),
        email,
        name,
        passwordHash,
      });
    });
  });
});
