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

describe('email verficiation complete', () => {
  const seed = require('../seeds/email_verification_request');

  beforeEach(() => seed.run());

  describe('when token is valid', () => {
    it('should be successful', async () => {
      const response = await supertest(expressApp)
        .post(`/email/email_activation/verify/${seed.validToken}`)
        .send()
        .expect(202);

      expect(response.body).toMatchSnapshot();
    });
  });

  describe('when token is expired', () => {
    it('should return an error', async () => {
      const response = await supertest(expressApp)
        .post(`/email/email_activation/verify/${seed.expiredToken}`)
        .send()
        .expect(400);

      expect(response.body).toMatchSnapshot();
    });
  });
});
