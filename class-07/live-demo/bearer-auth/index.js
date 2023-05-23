'use strict';

require('dotenv').config();
const PORT = process.env.PORT || 3002;
const { sequelize } = require('./src/auth/models');
const { start } = require('./src/server');

sequelize.sync()
  .then(() => {
    console.log('Successful DB connection');
    start(PORT);
  })
  .catch((err) => console.error(err));
