import supertest from 'supertest';
import { initApp } from '../utils/initApp';
import { resetDb } from '../utils/resetDb';

let expressApp: any;
let nestApp: any;

beforeAll(async () => {
  ({ expressApp, nestApp } = await initApp());
});

afterAll(() => nestApp.close());

beforeEach(resetDb);

describe('get user by id', () => {
  const seed = require('../seeds/authenticated_user');

  beforeEach(() => seed.run());

  describe('when requested by admin', () => {
    const adminSeed = require('../seeds/authenticated_admin_user');

    beforeEach(() => adminSeed.run());

    it('should succeed', async () => {
      const response = await supertest(expressApp)
        .get(`/users/${seed.id}`)
        .set('Authorization', `Bearer ${adminSeed.token}`)
        .expect(200);

      expect(response.body).toMatchSnapshot();
    });
  });

  describe('when requested by owner', () => {
    it('should succeed', async () => {
      const response = await supertest(expressApp)
        .get(`/users/${seed.id}`)
        .set('Authorization', `Bearer ${seed.token}`)
        .expect(200);

      expect(response.body).toMatchSnapshot();
    });
  });

  describe('when requested by someone else', () => {
    const otherSeed = require('../seeds/registered_user');

    beforeEach(() => otherSeed.run());

    it('should fail', async () => {
      const response = await supertest(expressApp)
        .get(`/users/${otherSeed.id}`)
        .set('Authorization', `Bearer ${seed.token}`)
        .expect(403);

      expect(response.body).toMatchSnapshot();
    });
  });
});
