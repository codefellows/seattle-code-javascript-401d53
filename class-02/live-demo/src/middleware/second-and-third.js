'use strict';

const second = (req, res, next) => {
  console.log('second middleware hit!');
  // next('feed it anything to cause an error');
  // next called with no argument means move on to the next middleware
  next();
};

const third = (req, res, next) => {
  console.log('third middleware hit!');
  // next('feed it anything to cause an error');
  // next called with no argument means move on to the next middleware
  next();
};

module.exports = { second, third };
