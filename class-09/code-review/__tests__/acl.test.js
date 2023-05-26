'use strict';

const { server } = require('../src/server');
const { db, users } = require('../src/models');
const supertest = require('supertest');
const request = supertest(server);

let testWriter;
let testAdmin;

beforeAll(async () => {
  await db.sync();
  testWriter = await users.create({
    username: 'Writer',
    password: 'pass123',
    role: 'writer',
  });
  testAdmin = await users.create({
    username: 'Admin',
    password: 'pass123',
    role: 'admin',
  });
});

afterAll(async () => {
  await db.drop();
});

describe('ACL Integration', () => {
  it('does not allow a writer delete access', async () => {
    let response = await request.get('/users').set('Authorization', `Bearer ${testWriter.token}`);
    let error = JSON.parse(response.text);

    expect(response.status).toEqual(500);
    expect(error.message).toEqual('Access Denied');
  });
  it('does allow an admin delete access', async () => {
    let response = await request.get('/users').set('Authorization', `Bearer ${testAdmin.token}`);

    let result = JSON.parse(response.text);

    expect(response.status).toEqual(200);
    expect(result).toEqual(['Writer', 'Admin']);

  });
});
