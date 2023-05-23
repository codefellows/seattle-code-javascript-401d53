'use strict';

// these tests are specific to LAB-06 solution, they may need to be updated to pass for lab-07 and lab-08
const supertest = require('supertest');
const { app } = require('../src/server');
const { sequelize } = require('../src/auth/models');

const request = supertest(app);

beforeAll( async () => {
  await sequelize.sync();
});

afterAll(async () => {
  await sequelize.drop();
});

describe('Auth Routes', (() => {
  test('allow for user signup', async () => {
    const response = await request.post('/signup').send({
      username: 'Lucky',
      password: 'woof',
    });

    expect(response.status).toEqual(200);
    expect(response.body.username).toEqual('Lucky');
  });

  test('allow for user signin', async () => {
    const response = await request.post('/signin').set('Authorization', 'Basic THVja3k6d29vZg==');

    expect(response.status).toEqual(200);
    expect(response.body.username).toEqual('Lucky');
  });
}));
