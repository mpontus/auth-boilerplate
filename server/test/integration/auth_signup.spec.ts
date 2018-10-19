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

describe('signup', () => {
  describe('when the user does not exist', () => {
    it('should be successful', async () => {
      const response = await supertest(expressApp)
        .post('/auth/signup')
        .send({
          name: 'Hailee58',
          email: 'nfisher@yahoo.com',
          password: '9O_8ywUKpHuHjnZ',
        })
        .expect(201);

      expect(response.body).toMatchSnapshot({
        token: expect.any(String),
        user: expect.objectContaining({
          name: 'Hailee58',
        }),
      });
    });
  });

  describe('when email is already taken', () => {
    const seed = require('../seeds/registered_user');

    beforeEach(() => seed.run());

    it('should be an error', async () => {
      const response = await supertest(expressApp)
        .post('/auth/signup')
        .send({
          name: 'Hailee58',
          email: seed.email,
          password: '9O_8ywUKpHuHjnZ',
        })
        .expect(400);

      expect(response.body).toMatchSnapshot();
    });
  });

  describe('when the email is invalid', () => {
    it('should be an error', async () => {
      const response = await supertest(expressApp)
        .post('/auth/signup')
        .send({
          name: 'Hailee58',
          email: 'foo',
          password: '9O_8ywUKpHuHjnZ',
        })
        .expect(400);

      expect(response.body).toMatchSnapshot();
    });
  });

  describe('when the password is too short', () => {
    it('should be an error', async () => {
      const response = await supertest(expressApp)
        .post('/auth/signup')
        .send({
          name: 'Hailee58',
          email: 'nfisher@yahoo.com',
          password: 'foo',
        })
        .expect(400);

      expect(response.body).toMatchSnapshot();
    });
  });

  describe('when the name is too long', () => {
    it('should be an error', async () => {
      const response = await supertest(expressApp)
        .post('/auth/signup')
        .send({
          name: 'x'.repeat(1000),
          email: 'nfisher@yahoo.com',
          password: '9O_8ywUKpHuHjnZ',
        })
        .expect(400);

      expect(response.body).toMatchSnapshot();
    });
  });
});
