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

describe('get user by id', () => {
  const seed = require('../seeds/many_users');

  beforeEach(() => seed.run());

  describe('when requested by admin', () => {
    const adminSeed = require('../seeds/authenticated_admin_user');

    beforeEach(() => adminSeed.run());

    describe('when pagination is omitted', () => {
      it('should succeed', async () => {
        const response = await supertest(expressApp)
          .get('/users')
          .set('Authorization', `Bearer ${adminSeed.token}`)
          .expect(200);

        expect(response.body).toMatchSnapshot();
      });
    });

    describe('when offset is provided', () => {
      it('should succeed', async () => {
        const response = await supertest(expressApp)
          .get('/users?skip=2')
          .set('Authorization', `Bearer ${adminSeed.token}`)
          .expect(200);

        expect(response.body).toMatchSnapshot();
      });
    });

    describe('when limit is provided', () => {
      it('should succeed', async () => {
        const response = await supertest(expressApp)
          .get('/users?take=2')
          .set('Authorization', `Bearer ${adminSeed.token}`)
          .expect(200);

        expect(response.body).toMatchSnapshot();
      });
    });

    describe('when offset is invalid', () => {
      it('should fail', async () => {
        const response = await supertest(expressApp)
          .get('/users?skip=foo')
          .set('Authorization', `Bearer ${adminSeed.token}`)
          .expect(400);

        expect(response.body).toMatchSnapshot();
      });
    });

    describe('when offset is negative', () => {
      it('should fail', async () => {
        const response = await supertest(expressApp)
          .get('/users?skip=-2')
          .set('Authorization', `Bearer ${adminSeed.token}`)
          .expect(400);

        expect(response.body).toMatchSnapshot();
      });
    });

    describe('when limit is invalid', () => {
      it('should fail', async () => {
        const response = await supertest(expressApp)
          .get('/users?take=foo')
          .set('Authorization', `Bearer ${adminSeed.token}`)
          .expect(400);

        expect(response.body).toMatchSnapshot();
      });
    });

    describe('when limit is negative', () => {
      it('should fail', async () => {
        const response = await supertest(expressApp)
          .get('/users?take=-2')
          .set('Authorization', `Bearer ${adminSeed.token}`)
          .expect(400);

        expect(response.body).toMatchSnapshot();
      });
    });

    describe('when limit is too large', () => {
      it('should fail', async () => {
        const response = await supertest(expressApp)
          .get('/users?take=90000')
          .set('Authorization', `Bearer ${adminSeed.token}`)
          .expect(400);

        expect(response.body).toMatchSnapshot();
      });
    });
  });

  describe('when requested by someone else', () => {
    const userSeed = require('../seeds/authenticated_user');

    beforeEach(() => userSeed.run());

    it('should fail', async () => {
      const response = await supertest(expressApp)
        .get(`/users`)
        .set('Authorization', `Bearer ${userSeed.token}`)
        .expect(403);

      expect(response.body).toMatchSnapshot();
    });
  });
});
