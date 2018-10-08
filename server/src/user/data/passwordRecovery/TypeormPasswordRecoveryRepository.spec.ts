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
