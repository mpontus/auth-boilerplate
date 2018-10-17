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

describe('email verficiation request', () => {
  describe('when user exists', () => {
    const seed = require('../seeds/registered_user');

    beforeEach(() => seed.run());

    it('should be successful', async () => {
      const response = await supertest(expressApp)
        .post('/email/email_activation/request')
        .send({
          email: seed.email,
        })
        .expect(202);

      expect(response.body).toMatchSnapshot();
    });
  });

  describe('when user email is already verified', () => {
    const seed = require('../seeds/registered_user_verified_email');

    beforeEach(() => seed.run());

    it('should return an error', async () => {
      const response = await supertest(expressApp)
        .post('/email/email_activation/request')
        .send({
          email: seed.email,
        })
        .expect(400);

      expect(response.body).toMatchSnapshot();
    });
  });

  describe('when user does not exist', () => {
    it('should return an error', async () => {
      const response = await supertest(expressApp)
        .post('/email/email_activation/request')
        .send({
          email: 'nwashington@gmail.com',
        })
        .expect(400);

      expect(response.body).toMatchSnapshot();
    });
  });
});
