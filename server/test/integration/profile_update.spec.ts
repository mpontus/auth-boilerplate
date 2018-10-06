import request from 'supertest';
import { resetDb } from '../utils/resetDb';
import { initApp } from '../utils/initApp';

let expressApp: any, nestApp: any;

beforeAll(async () => {
  ({ expressApp, nestApp } = await initApp());
});

afterAll(() => nestApp.close());

beforeEach(() => resetDb());

describe('Profile update', () => {
  describe('When user is authenticated', () => {
    const seed = require('../seeds/authenticated_user');

    beforeEach(() => seed.run());

    it('should be successful', async () => {
      const response = await request(expressApp)
        .patch(`/auth/profile`)
        .send({
          name: 'Victor Martinez',
        })
        .set('Authorization', `Bearer ${seed.token}`)
        .expect(202);

      expect(response.body).toMatchSnapshot();
    });
  });

  describe('When user is unauthenticated', () => {
    it('should fail', async () => {
      const response = await request(expressApp)
        .patch(`/auth/profile`)
        .send({
          name: 'Victor Martinez',
        })
        .expect(401);

      expect(response.body).toMatchSnapshot();
    });
  });
});

describe('Updating email', () => {
  const seed = require('../seeds/authenticated_user');

  beforeEach(() => seed.run());

  describe('when current password is present', () => {
    it('should be successful', async () => {
      const response = await request(expressApp)
        .patch(`/auth/profile`)
        .send({
          currentPassword: seed.password,
          email: 'dillondelacruz@shaw.com',
        })
        .set('Authorization', `Bearer ${seed.token}`)
        .expect(202);

      expect(response.body).toMatchSnapshot();
    });
  });

  describe('when current password is invalid', () => {
    it('should fail', async () => {
      const response = await request(expressApp)
        .patch(`/auth/profile`)
        .send({
          currentPassword: 'foo',
          email: 'dillondelacruz@shaw.com',
        })
        .set('Authorization', `Bearer ${seed.token}`)
        .expect(400);

      expect(response.body).toMatchSnapshot();
    });
  });
});

describe('Updating password', () => {
  const seed = require('../seeds/authenticated_user');

  beforeEach(() => seed.run());

  describe('when current password is present', () => {
    it('should be successful', async () => {
      const response = await request(expressApp)
        .patch(`/auth/profile`)
        .send({
          currentPassword: seed.password,
          password: 'ngbA1CVl!H',
        })
        .set('Authorization', `Bearer ${seed.token}`)
        .expect(202);

      expect(response.body).toMatchSnapshot();
    });
  });

  describe('when current password is invalid', () => {
    it('should fail', async () => {
      const response = await request(expressApp)
        .patch(`/auth/profile`)
        .send({
          currentPassword: 'foo',
          password: 'ngbA1CVl!H',
        })
        .set('Authorization', `Bearer ${seed.token}`)
        .expect(400);

      expect(response.body).toMatchSnapshot();
    });
  });
});
