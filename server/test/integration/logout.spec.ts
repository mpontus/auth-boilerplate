import request from 'supertest';
import { resetDb } from '../utils/resetDb';
import { initApp } from '../utils/initApp';

let expressApp: any, nestApp: any;

beforeAll(async () => {
  ({ expressApp, nestApp } = await initApp());
});

afterAll(() => nestApp.close());

beforeEach(() => resetDb());

describe('logout', () => {
  describe('when user owns the sesssion', () => {
    const seed = require('../seeds/authenticated_user');

    beforeEach(() => seed.run());

    it('should be successful', async () => {
      const response = await request(expressApp)
        .post(`/auth/logout/${seed.token}`)
        .set('Authorization', `Bearer ${seed.token}`)
        .expect(202);

      expect(response.body).toMatchSnapshot();
    });
  });
});
