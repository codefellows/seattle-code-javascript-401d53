'use strict';

require('dotenv').config();
const { db } = require('./src/models');
const server = require('./src/server.js');
const PORT = process.env.PORT || 3001;

db.sync().then(() => {
  // historically we have logged "successful connection" here in the past, not necessary.  IF server starts, db is synced
  server.start(PORT);
});
