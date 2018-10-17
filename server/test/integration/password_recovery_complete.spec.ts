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

describe('password recovery complete', () => {
  const seed = require('../seeds/password_recovery_request');

  beforeEach(() => seed.run());

  describe('when token is valid', () => {
    it('should be successful', async () => {
      const response = await supertest(expressApp)
        .post(`/email/password_recovery/verify/${seed.validToken}`)
        .send({
          password: '_q*9s^Li$G',
        })
        .expect(202);

      expect(response.body).toMatchSnapshot();
    });
  });

  describe('when new password is invalid', () => {
    it('should return an error', async () => {
      const response = await supertest(expressApp)
        .post(`/email/password_recovery/verify/${seed.validToken}`)
        .send({
          password: 'foo',
        })
        .expect(400);

      expect(response.body).toMatchSnapshot();
    });
  });

  describe('when the password is the same as previous one', () => {
    it('should return an error', async () => {
      const response = await supertest(expressApp)
        .post(`/email/password_recovery/verify/${seed.validToken}`)
        .send({
          password: seed.previousPassword,
        })
        .expect(400);

      expect(response.body).toMatchSnapshot();
    });
  });

  describe('when token is expired', () => {
    it('should return an error', async () => {
      const response = await supertest(expressApp)
        .post(`/email/password_recovery/verify/${seed.expiredToken}`)
        .send({
          password: '_q*9s^Li$G',
        })
        .expect(400);

      expect(response.body).toMatchSnapshot();
    });
  });
});
