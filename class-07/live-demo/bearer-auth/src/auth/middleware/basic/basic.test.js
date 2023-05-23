'use strict';

// this test suite failing, but tests PASSING and specific to lab-06, basic auth.  do they work for lab-07?

const basicAuth = require('.');
const { sequelize, userModel } = require('../../models');
const base64 = require('base-64');

let user = {
  username: 'lucky',
  password: 'woof',
};

describe('Basic Auth Middleware Tests', () => {
  beforeAll(async () => {
    await sequelize.sync();
    await userModel.create(user);
  });
  
  afterAll(async () => {
    await sequelize.drop();
  });

  test('test /signin route fails appropriately', () => {
    // unit test of basic auth only
    let req = {
      headers: {
        authorization: 'Basic banana',
      },
    };
    let res = {};
    let next = jest.fn();

    basicAuth(req, res, next)
      .then(() => {
        expect(next).toHaveBeenCalledWith('Not authorized (user doesn\'t exist in DB)');
      });
  });

  test('passes appropriately', () => {
    let { username, password } = user;
    let encodedUser = base64.encode(`${username}:${password}`);
    console.log('encodedUser:', encodedUser);
    let req = {
      headers: {
        authorization: `Basic ${encodedUser}`,
      },
    };
    let res = {};
    let next = jest.fn();

    basicAuth(req, res, next)
      .then(() => {
        expect(req.user).toEqual('lucky');
        expect(next).toHaveBeenCalledWith();
      });
  });
});
