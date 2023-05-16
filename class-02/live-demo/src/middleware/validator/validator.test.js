'use strict';


// these are two ways to require the index file
const validator = require('.');
// const validator = require('./index');

describe('Validator middleware', () => {
  let req = {};
  let res = {};
  // this "mocks" the next function
  let next = jest.fn();
  test('throws an error as expected', () => {
    // this tests validator/index.js line 9
    req = { params: { banana: 'something' } }
    validator(req, res, next);

    expect(next).toHaveBeenCalledWith('Path parameter must be banana');
  });

  test('runs successfully as expected', () => {
    // this tests validator/index.js line 7
    req = { params: { banana: 'banana' } }
    validator(req, res, next);

    expect(next).toHaveBeenCalledWith();
  });

})


