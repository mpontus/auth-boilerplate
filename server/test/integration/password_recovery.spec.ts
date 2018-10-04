import * as request from 'supertest';
import { resetDb } from '../utils/resetDb';
import { initApp } from '../utils/initApp';

let expressApp, nestApp;

beforeAll(async () => {
  ({ expressApp, nestApp } = await initApp());
});

afterAll(() => nestApp.close());

beforeEach(() => resetDb());

describe('Password recovery', () => {
  describe('when the user exists', () => {
    const seed = require('../seeds/registered_user');

    beforeEach(() => seed.run());

    it('should match response snapshot', async () => {
      const response = await request(expressApp)
        .post('/auth/password_recovery')
        .send({
          email: seed.email,
        })
        .expect(202);

      expect(response.body).toMatchSnapshot();
    });
  });

  describe('when the user does not exist', () => {
    it('should match response snapshot', async () => {
      const response = await request(expressApp)
        .post('/auth/password_recovery')
        .send({
          email: 'foo@bar.baz',
        })
        .expect(400);

      expect(response.body).toMatchSnapshot();
    });
  });
});
