'use strict';

module.exports = (error, req, res, next) => {
  // ternary wtf
  const errorMessage = typeof(error) === 'string' ? error : error.message;
  res.status(500).send({
    error: 500,
    route: req.path,
    query: req.query,
    path: req.params,
    body: req.body,
    message: `Server Error: ${errorMessage}`,
  })
};
