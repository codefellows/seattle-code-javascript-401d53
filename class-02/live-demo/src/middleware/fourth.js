'use strict';

module.exports = (req, res, next) => {
  console.log('fourth middleware hit!');
  next();
};
