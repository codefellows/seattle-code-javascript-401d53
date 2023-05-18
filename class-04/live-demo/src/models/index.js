'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const customer = require('./customer');
const order = require('./order');
const Collection = require('./collection');

// will make dynamic for testing environment.  known bug.  double colons might not work for YOU, use single colon 'sqlite:memory:' if that is the case 
const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite::memory:' : process.env.DATABASE_URL;

// not test friendly
// const DATABASE_URL = process.env.DATABASE_URL;

// database singleton
const sequelizeDatabase = new Sequelize(DATABASE_URL);

// create our working and connected customer database model
const customerModel = customer(sequelizeDatabase, DataTypes);
const orderModel = order(sequelizeDatabase, DataTypes);

// create associations
customerModel.hasMany(orderModel);
orderModel.belongsTo(customerModel);

module.exports = {
  sequelizeDatabase,
  customerModel,
  order: new Collection(orderModel),
};
