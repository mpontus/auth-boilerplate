import { createConnection, Connection, EntityManager } from 'typeorm';
import { UserEntity } from '../user/UserEntity';
import { TypeormSessionRepository } from './TypeormSessionRepository';
import { SessionEntity } from './SessionEntity';

let connection: Connection;
let manager: EntityManager;
let sessionRepository: TypeormSessionRepository;

beforeAll(async () => {
  connection = await createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: [SessionEntity, UserEntity],
  });

  manager = connection.manager;
  sessionRepository = new TypeormSessionRepository(manager);
});

beforeEach(() => connection.synchronize(true));

afterAll(() => connection.close());

describe('find', () => {
  const token = '71bPiFy8)g';
  const email = 'laura80@hotmail.com';

  beforeEach(async () => {
    const userEntity = {
      email,
      name: 'Samantha Washington',
      passwordHash: 'kvg4#MXl)(',
    };

    const sessionEntity = {
      user: userEntity,
      token,
    };

    await manager.save(SessionEntity, sessionEntity);
  });

  describe('when session does not exists', () => {
    it('should retrieve session from the database', async () => {
      expect(await sessionRepository.find('H$4Dxli4R8')).toEqual(null);
    });
  });

  describe('when session exists', () => {
    it('should retrieve session from the database', async () => {
      expect(await sessionRepository.find(token)).toEqual({
        token,
        user: expect.objectContaining({
          email,
        }),
        destroyed: false,
      });
    });
  });
});

describe('create', () => {
  const userPartial = {
    name: 'Natalie Pope',
    email: 'dillondelacruz@shaw.com',
    passwordHash: '71bPiFy8)g',
  };

  beforeEach(async () => {
    await manager.insert(UserEntity, userPartial);
  });

  beforeEach(async () => {
    await sessionRepository.create({
      id: '1',
      ...userPartial,
    });
  });

  it('should save new session in the database', async () => {
    expect(await manager.find(SessionEntity, { relations: ['user'] })).toEqual([
      {
        id: expect.any(Number),
        token: expect.any(String),
        user: expect.objectContaining({
          ...userPartial,
        }),
      },
    ]);
  });
});

describe('destroy', () => {
  const token = 'ngbA1CVl!H';
  const userPartial = {
    name: 'Natalie Pope',
    email: 'dillondelacruz@shaw.com',
    passwordHash: '71bPiFy8)g',
  };

  beforeEach(async () => {
    const userEntity = {
      ...userPartial,
    };

    const sessionEntity = {
      token,
      user: userEntity,
    };

    await manager.save(SessionEntity, sessionEntity);
  });

  beforeEach(async () => {
    await sessionRepository.destroy(token);
  });

  it('should delete session from the database', async () => {
    expect(await manager.find(SessionEntity, { relations: ['user'] })).toEqual(
      [],
    );
  });
});
