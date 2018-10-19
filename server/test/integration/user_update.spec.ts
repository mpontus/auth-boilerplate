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

describe('profile update', () => {
  const seed = require('../seeds/authenticated_user');

  beforeEach(() => seed.run());

  describe('when requested by admin', () => {
    const adminSeed = require('../seeds/authenticated_admin_user');

    beforeEach(() => adminSeed.run());

    describe('when name is being updated', () => {
      it('should succeed', async () => {
        const response = await supertest(expressApp)
          .patch(`/users/${seed.id}`)
          .send({
            name: 'Samantha Washington',
          })
          .set('Authorization', `Bearer ${adminSeed.token}`)
          .expect(200);

        expect(response.body).toMatchSnapshot();
      });
    });

    describe('when email is being updated', () => {
      it('should succeed', async () => {
        const response = await supertest(expressApp)
          .patch(`/users/${seed.id}`)
          .send({
            email: 'mitchell97@jones-smith.net',
          })
          .set('Authorization', `Bearer ${adminSeed.token}`)
          .expect(200);

        expect(response.body).toMatchSnapshot();
      });
    });

    describe('when password is being updated', () => {
      it('should succeed', async () => {
        const response = await supertest(expressApp)
          .patch(`/users/${seed.id}`)
          .send({
            password: '71bPiFy8)g',
          })
          .set('Authorization', `Bearer ${adminSeed.token}`)
          .expect(200);

        expect(response.body).toMatchSnapshot();
      });
    });
  });

  describe('when requested by owner', () => {
    describe('when name is being updated', () => {
      it('should succeed', async () => {
        const response = await supertest(expressApp)
          .patch(`/users/${seed.id}`)
          .send({
            name: 'Norma Fisher',
          })
          .set('Authorization', `Bearer ${seed.token}`)
          .expect(200);

        expect(response.body).toMatchSnapshot();
      });
    });

    describe('when email is being updated', () => {
      describe('when current password is valid', () => {
        it('should succeed', async () => {
          const response = await supertest(expressApp)
            .patch(`/users/${seed.id}`)
            .send({
              email: 'laura80@hotmail.com',
              currentPassword: seed.password,
            })
            .set('Authorization', `Bearer ${seed.token}`)
            .expect(200);

          expect(response.body).toMatchSnapshot();
        });
      });

      describe('when current password is invalid', () => {
        it('should fail', async () => {
          const response = await supertest(expressApp)
            .patch(`/users/${seed.id}`)
            .send({
              email: 'laura80@hotmail.com',
              currentPassword: '71bPiFy8)g',
            })
            .set('Authorization', `Bearer ${seed.token}`)
            .expect(400);

          expect(response.body).toMatchSnapshot();
        });
      });
    });

    describe('when password is being updated', () => {
      describe('when current password is valid', () => {
        it('should succeed', async () => {
          const response = await supertest(expressApp)
            .patch(`/users/${seed.id}`)
            .send({
              password: 'x6tnBEr4&i',
              currentPassword: seed.password,
            })
            .set('Authorization', `Bearer ${seed.token}`)
            .expect(200);

          expect(response.body).toMatchSnapshot();
        });
      });

      describe('when current password is invalid', () => {
        it('should fail', async () => {
          const response = await supertest(expressApp)
            .patch(`/users/${seed.id}`)
            .send({
              password: 'x6tnBEr4&i',
              currentPassword: '#(i9Z3OyGW',
            })
            .set('Authorization', `Bearer ${seed.token}`)
            .expect(400);

          expect(response.body).toMatchSnapshot();
        });
      });
    });
  });

  describe('when requested by someone else', () => {
    const otherUserSeed = require('../seeds/registered_user');

    beforeEach(() => otherUserSeed.run());

    it('should fail', async () => {
      const response = await supertest(expressApp)
        .patch(`/users/${otherUserSeed.id}`)
        .send({
          name: 'Chris Curtis',
        })
        .set('Authorization', `Bearer ${seed.token}`)
        .expect(403);

      expect(response.body).toMatchSnapshot();
    });
  });
});
