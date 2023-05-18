'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const customer = require('./customer');

// will make dynamic for testing environment
const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite::memory:' : process.env.DATABASE_URL;

// database singleton
const sequelizeDatabase = new Sequelize(DATABASE_URL);

// create our working and connected customer database model
const customerModel = customer(sequelizeDatabase, DataTypes);

module.exports = {
  sequelizeDatabase,
  customerModel,
};
