'use strict';

// TODO: write middleware
module.exports = (req, res, next) => {
  // if i want to know it exist I can do this
  if(req.params.banana === 'banana'){
    next();
  } else {
    next('Path parameter must be banana')
  }
}
