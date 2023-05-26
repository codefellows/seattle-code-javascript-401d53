'use strict';

const { server } = require('../src/server');
const supertest = require('supertest');
const { db } = require('../src/models');
const request = supertest(server);

beforeAll(async () => {
  await db.sync();
});

afterAll(async () => {
  await db.drop();
});

describe('Auth router', () => {
  let token;
  it('creates a user', async () => {
    let response = await request.post('/signup').send({
      username: 'Tester',
      password: 'pass123',
    });

    expect(response.status).toEqual(201);
    expect(response.body.user.username).toEqual('Tester');
  });
  it('allows existing user to signin', async () => {

    let response = await request.post('/signin').auth('Tester', 'pass123');
    // used for additional auth route test /secret 
    token = response.body.user.token;
    expect(response.status).toEqual(200);
    expect(response.body.user.username).toEqual('Tester');

    // cannot predict exact - it is hashed.
    expect(response.body.user.password).toBeTruthy();

    //token appears different each time, cannot predict exact characters.
    expect(response.body.user.token).toBeTruthy();

  });
  it('fails with bad signin credentials', async () => {

    let response = await request.post('/signin').auth('Tester', 'badPassword');

    expect(response.status).toEqual(403);
    expect(response.text).toEqual('Invalid Login');
  });
  it('allows access to /secret route with any valid token', async() => {
    let response = await request.get('/secret').set('Authorization', `Bearer ${token}`);

    expect(response.status).toEqual(200);
    expect(response.text).toEqual('Welcome to the secret area');
  });

}); 
