'use strict';

const supertest = require('supertest');
const { app } = require('../src/server');
const { sequelizeDatabase } = require('../src/models');
const request = supertest(app);

beforeAll(async() => {
  await sequelizeDatabase.sync();
});

afterAll(async() => {
  await sequelizeDatabase.drop();
});

describe('Customer routes', () => {
  test('create a customer', async() => {
    let response = await request.post('/customer').send({
      name: 'Test',
      age: 42,
      pronouns: 'she/her',
    });

    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('Test');
    expect(response.body.age).toEqual(42);
  });

  test('gets all customers', async() => {
    let response = await request.get('/customer');

    expect(response.status).toEqual(200);
    expect(response.body[0].name).toEqual('Test');
    expect(response.body[0].age).toEqual(42);
  });
});
