import { createConnection, Connection, EntityManager } from 'typeorm';
import { TypeormPasswordRecoveryRepository } from './TypeormPasswordRecoveryRepository';
import { UserEntity } from '../user/UserEntity';
import { PasswordRecoveryEntity } from './PasswordRecoveryEntity';

let connection: Connection;
let manager: EntityManager;
let repository: TypeormPasswordRecoveryRepository;

beforeAll(async () => {
  connection = await createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: [PasswordRecoveryEntity, UserEntity],
  });

  manager = connection.manager;
  repository = new TypeormPasswordRecoveryRepository(manager);
});

beforeEach(async () => {
  await connection.synchronize(true);
});

describe('create', () => {
  const user = {
    id: '1',
    name: 'Chris Curtis',
    email: 'ngallagher@cole-pearson.info',
    passwordHash: 'H$4Dxli4R8',
  };

  beforeEach(async () => {
    await manager.insert(UserEntity, {
      name: user.id,
      email: user.email,
      passwordHash: user.passwordHash,
    });
  });

  let result: any;

  beforeEach(async () => {
    result = await repository.create(user);
  });

  it('should save the request in the database', async () => {
    expect(
      await manager.find(PasswordRecoveryEntity, { relations: ['user'] }),
    ).toEqual([
      {
        id: expect.any(Number),
        token: expect.any(String),
        expires: expect.any(Date),
        user: expect.objectContaining({
          id: parseInt(user.id),
        }),
      },
    ]);
  });

  it('should return password recovery object', () => {
    expect(result).toEqual({
      token: expect.any(String),
      user,
      expires: expect.any(Date),
      fulfilled: false,
    });
  });
});

describe('find', () => {
  describe('when the request does not exist', () => {
    it('should return null', async () => {
      expect(await repository.find('FW9%!nRe$M')).toEqual(null);
    });
  });

  describe('when the request exists', () => {
    const token = 'FW9%!nRe$M';
    const expires = new Date();
    const user = {
      name: 'Theresa Brown',
      email: 'nfisher@yahoo.com',
      passwordHash: '#(i9Z3OyGW',
    };

    beforeEach(async () => {
      const userEntity = {
        ...user,
      };

      const requestEntity = {
        token,
        expires,
        user: userEntity,
      };

      await manager.save(UserEntity, userEntity);
      await manager.save(PasswordRecoveryEntity, requestEntity);
    });

    it('should return the request', async () => {
      expect(await repository.find(token)).toEqual({
        token,
        expires,
        user: expect.objectContaining(user),
        fulfilled: false,
      });
    });
  });
});
