'use strict';

module.exports = (sequelizeDatabase, DataTypes) => {
  // note that customers WILL BE the name of the table created, pluralized
  // each property: name, age, pronouns correspond to a column in the database
  return sequelizeDatabase.define('customers', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    pronouns: {
      type: DataTypes.ENUM,
      values: ['they/them', 'he/them', 'she/her', 'he/him'],
      allowNull: true,
    },
  });
};
