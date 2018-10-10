import request from 'supertest';
import { resetDb } from '../utils/resetDb';
import { initApp } from '../utils/initApp';

let expressApp: any, nestApp: any;

beforeAll(async () => {
  ({ expressApp, nestApp } = await initApp());
});

afterAll(() => nestApp.close());

beforeEach(() => resetDb());

describe('Password reset', () => {
  describe('when email and secret are correct', () => {
    const newPassword = 'foobarbaz';
    const seed = require('../seeds/password_recovery_request');

    beforeEach(() => seed.run());

    it('should return successful response', async () => {
      const response = await request(expressApp)
        .post('/auth/reset_password')
        .send({
          secret: seed.secret,
          email: seed.userEmail,
          password: newPassword,
        })
        .expect(202);

      expect(response.body).toMatchSnapshot();
    });
  });

  describe('when password is invalid', () => {
    const seed = require('../seeds/password_recovery_request');

    beforeEach(() => seed.run());

    it('should return failed response', async () => {
      const response = await request(expressApp)
        .post('/auth/reset_password')
        .send({
          secret: seed.secret,
          email: seed.userEmail,
          password: '',
        })
        .expect(400);

      expect(response.body).toMatchSnapshot();
    });
  });
});
