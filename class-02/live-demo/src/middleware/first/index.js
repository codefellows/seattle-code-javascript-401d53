'use strict';

const first = (req, res, next) => {
  console.log('first middleware hit!');
  // next('feed it anything to cause an error');
  // next called with no argument means move on to the next middleware
  next();
};

module.exports = first;
