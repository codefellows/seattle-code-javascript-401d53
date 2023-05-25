'use strict';

// 3rd Party Resources
const express = require('express');
const cors = require('cors');

// Esoteric Resources
const notFoundHandler = require('./error-handlers/404.js');
const errorHandler = require('./error-handlers/500.js');
const logger = require('./middleware/logger.js');
const authRoutes = require('./auth/routes.js');
const v1Routes = require('./routes/v1.js');
const v2Routes = require('./routes/v2.js');

// Prepare the express app with singleton
const app = express();

// App Level MW
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

// Routes
app.use(authRoutes);
app.use('/api/v1', v1Routes);
app.use('/api/v2', v2Routes);

app.use('*', notFoundHandler);
app.use(errorHandler);

module.exports = {
  server: app,
  start: port => {
    if (!port) { throw new Error('Missing Port'); }
    app.listen(port, () => console.log(`Listening on ${port}`));
  },
};
