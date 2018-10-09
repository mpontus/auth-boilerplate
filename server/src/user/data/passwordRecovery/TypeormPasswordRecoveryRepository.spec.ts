import dayjs from 'dayjs';
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

beforeEach(() => connection.synchronize(true));

afterAll(() => connection.close());

describe('find', () => {
  const token = 'FW9%!nRe$M';
  const expires = dayjs()
    .add(1, 'day')
    .toDate();
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

  describe('when the request does not exist', () => {
    it('should return null', async () => {
      expect(await repository.find('ngbA1CVl!H')).toEqual(null);
    });
  });

  describe('when the request is expired', () => {
    beforeEach(async () => {
      await manager.update(
        PasswordRecoveryEntity,
        { token },
        {
          expires: dayjs()
            .subtract(5, 'day')
            .toDate(),
        },
      );
    });

    it('should return null', async () => {
      expect(await repository.find(token)).toEqual(null);
    });
  });

  describe('when the request exists', () => {
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

  it('should have future expiry date', () => {
    expect(result.expires.getTime()).toBeGreaterThan(Date.now());
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

describe('destroy', () => {
  const token = 'H$4Dxli4R8';
  const expires = new Date();
  const user = {
    name: 'Theresa Brown',
    email: 'mitchell97@jones-smith.net',
    passwordHash: 'H$4Dxli4R8',
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

  describe('when request does not exist', () => {
    it('shold throw an error', () => {
      expect(repository.destroy('ngbA1CVl!H')).rejects.toThrow();
    });
  });

  describe('when the request is expired', () => {
    beforeEach(async () => {
      await manager.update(
        PasswordRecoveryEntity,
        { token },
        {
          expires: dayjs()
            .subtract(5, 'day')
            .toDate(),
        },
      );
    });

    it('should return null', async () => {
      expect(await repository.find(token)).toEqual(null);
    });
  });

  describe('when request exists', () => {
    let result: any;

    beforeEach(async () => {
      result = await repository.destroy(token);
    });

    it('should remove the request from the database', async () => {
      expect(await manager.find(PasswordRecoveryEntity, {})).toEqual([]);
    });

    it('should return removed password recovery entity', () => {
      expect(result).toEqual({
        token: expect.any(String),
        user: {
          id: expect.any(String),
          ...user,
        },
        expires: expect.any(Date),
        fulfilled: false,
      });
    });
  });
});
