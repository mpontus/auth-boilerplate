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

describe('add user role', () => {
  const adminSeed = require('../seeds/authenticated_admin_user');

  beforeEach(() => adminSeed.run());

  describe('when requested by admin', () => {
    it('should succeed', async () => {
      const response = await supertest(expressApp)
        .delete(`/users/${adminSeed.id}/roles/admin`)
        .set('Authorization', `Bearer ${adminSeed.token}`)
        .expect(200);

      expect(response.body).toMatchSnapshot();
    });
  });

  describe('when requested by someone else', () => {
    const userSeed = require('../seeds/authenticated_user');

    beforeEach(() => userSeed.run());

    it('should fail', async () => {
      const response = await supertest(expressApp)
        .delete(`/users/${adminSeed.id}/roles/admin`)
        .set('Authorization', `Bearer ${userSeed.token}`)
        .expect(403);

      expect(response.body).toMatchSnapshot();
    });
  });
});
