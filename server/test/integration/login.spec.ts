import request from 'supertest';
import { resetDb } from '../utils/resetDb';
import { initApp } from '../utils/initApp';

let expressApp: any, nestApp: any;

beforeAll(async () => {
  ({ expressApp, nestApp } = await initApp());
});

afterAll(() => nestApp.close());

beforeEach(() => resetDb());

describe('signup', () => {
  describe('when credentials are correct', () => {
    const seed = require('../seeds/registered_user');

    beforeEach(() => seed.run());

    it('should be successful', async () => {
      const response = await request(expressApp)
        .post('/auth/login')
        .send({
          email: seed.email,
          password: seed.password,
        })
        .expect(201);

      expect(response.body).toMatchSnapshot({
        token: expect.any(String),
      });
    });
  });

  describe('when the user does not exist', () => {
    it('should be an error', async () => {
      const response = await request(expressApp)
        .post('/profile')
        .send({
          email: 'nfisher@yahoo.com',
          password: '9O_8ywUKpHuHjnZ',
        })
        .expect(400);

      expect(response.body).toMatchSnapshot();
    });
  });
});
