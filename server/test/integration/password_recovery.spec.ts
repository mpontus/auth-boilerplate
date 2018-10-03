import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
// import { app } from '../utils/app';
import { resetDb } from '../utils/resetDb';

let app;

beforeAll(async () => {
  const moduleFixture = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleFixture.createNestApplication();
  await app.init();
});

beforeEach(() => resetDb());

// describe('when user does not exist', () => {
//   it('should match response snapshot', async () => {
//     const response = await request(app.getHttpServer())
//       .post('/auth/password_recovery')
//       .send({
//         email: 'fkgjhdfkjgh@bar.baz',
//       })
//       .expect(200);

//     expect(response).toMatchSnapshot();
//   });
// });

describe('when user exists', () => {
  const seed = require('../seeds/registered_user');

  beforeEach(() => seed.run());

  it('should match response snapshot', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/password_recovery')
      .send({
        email: seed.email,
      })
      .expect(201);

    expect(response.body).toMatchSnapshot();
  });
});

describe('Password reset', () => {
  const newPassword = 'foobarbaz';
  const seed = require('../seeds/password_recovery_request');

  beforeEach(() => seed.run());

  it('should match response snapshot', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/reset_password')
      .send({
        secret: seed.secret,
        email: seed.userEmail,
        password: newPassword,
      })
      .expect(201);
    expect(response.body).toMatchSnapshot();
  });
});
