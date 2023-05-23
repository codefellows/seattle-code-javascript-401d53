'use strict';

// this test suite passing and specific to lab-06, basic auth.  Do they work for lab-07?
const supertest = require('supertest');

const { sequelize } = require('../src/auth/models');
const { app } = require('../src/server');

const request = supertest(app);

beforeAll(async () => {
  await sequelize.sync();
});

afterAll(async () => {
  await sequelize.drop();
});

describe('Auth Routes', () => {
  test('allow for signup', async () => {
    const response = await request.post('/signup').send({
      username: 'Tester', 
      password: 'pass',
    });

    expect(response.status).toEqual(200);
  });
  test('allow for signin', async () => {
    const response = await request.post('/signin').set('Authorization', 'Basic VGVzdGVyOnBhc3M=');

    expect(response.status).toEqual(200);
  });

});



