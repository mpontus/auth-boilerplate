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

describe('login', () => {
  describe('anonymous authentication', () => {
    it('should be successful', async () => {
      const response = await supertest(expressApp)
        .post('/auth/login/anonymous')
        .expect(201);

      expect(response.body).toMatchSnapshot({
        token: expect.any(String),
      });
    });
  });

  describe('when credentials are correct', () => {
    const seed = require('../seeds/registered_user');

    beforeEach(() => seed.run());

    it('should be successful', async () => {
      const response = await supertest(expressApp)
        .post('/auth/login')
        .send({
          email: seed.email,
          password: seed.password,
        })
        .expect(201);

      expect(response.body).toMatchSnapshot({
        token: expect.any(String),
        user: expect.objectContaining({
          id: seed.id,
        }),
      });
    });
  });

  describe('when the user does not exist', () => {
    it('should be an error', async () => {
      const response = await supertest(expressApp)
        .post('/auth/login')
        .send({
          email: 'nfisher@yahoo.com',
          password: '9O_8ywUKpHuHjnZ',
        })
        .expect(400);

      expect(response.body).toMatchSnapshot();
    });
  });
});
