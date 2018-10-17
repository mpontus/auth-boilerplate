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

describe('password recovery request', () => {
  describe('when user exists', () => {
    const seed = require('../seeds/registered_user');

    beforeEach(() => seed.run());

    it('should be successful', async () => {
      const response = await supertest(expressApp)
        .post('/email/password_recovery/request')
        .send({
          email: seed.email,
        })
        .expect(202);

      expect(response.body).toMatchSnapshot();
    });
  });

  describe('when user does not exist', () => {
    it('should return an error', async () => {
      const response = await supertest(expressApp)
        .post('/email/password_recovery/request')
        .send({
          email: 'nwashington@gmail.com',
        })
        .expect(400);

      expect(response.body).toMatchSnapshot();
    });
  });
});
