import * as request from 'supertest';
import { resetDb } from '../utils/resetDb';
import { initApp } from '../utils/initApp';

let expressApp, nestApp;

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

  describe('when email does not match secret', () => {
    const newPassword = 'foobarbaz';
    const userSeed = require('../seeds/registered_user.ts');
    const recoverySeed = require('../seeds/password_recovery_request');

    beforeEach(() => userSeed.run());
    beforeEach(() => recoverySeed.run());

    it('should return failed response', async () => {
      const response = await request(expressApp)
        .post('/auth/reset_password')
        .send({
          secret: recoverySeed.secret,
          email: userSeed.email,
          password: newPassword,
        })
        .expect(400);

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
