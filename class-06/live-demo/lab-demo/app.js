'use strict'

// 3rd party requirements
require('dotenv').config();
const express = require('express');
const base64 = require('base-64');
const bcrypt = require('bcrypt');
const { Sequelize, DataTypes } = require('sequelize');

const PORT = process.env.PORT || 3002;
// server singleton
const app = express();
app.use(express.json());

// allows us to accept webform data.  aka process FORM input and add to request body
// NOT NECESSARY FOR TODAY, BUT GOOD QUALITY OF LIFE TO KNOW ABOUT FOR LATER
app.use(express.urlencoded({extended: true}));

// setup database url
const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite::memory:' : process.env.DATABASE_URL;

// db singleton
const sequelize = new Sequelize(DATABASE_URL);

// create a user model

const userModel = sequelize.define('users', {
  // the big diff:  notice there is no return
  // use SAME property names always
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

// hey, this middleware exists!   I can interact with the user before creating the record in our DB
userModel.beforeCreate((user) => {
  console.log('our user before being added to DB', user);
});

const basicAuth = async (req, res, next) => {
  let { authorization } = req.headers;
  // console.log('authorization: ', authorization);
  //                                            Basic username:password
  // 1. isolate the encoded part of the string - Basic UnlhbjpwYXNz
  let authString = authorization.split(' ')[1];
  // console.log('authString:', authString);

  // 2. decode the authstring
  let decodedAuthString = base64.decode(authString);
  console.log('decodedAuthString:', decodedAuthString);

  // 3. I need to isolate the password FROM the decoded string
  let [username, password] = decodedAuthString.split(':')
  console.log('password:', password);

  let user = await userModel.findOne({where: { username }});
  // console.log('user:', user);
  if (user){
    let validUser = await bcrypt.compare(password, user.password)
    if(validUser){
      req.user = user;
      next();
    } else {
      next('Not authorized (incorrect password)')
    }
  } else {
    next('Not authorized (user doesn\'t exist in DB)')
  }
  next();
}

app.post('/signup', async (req, res, next) => {
  // great proof of life
  // res.status(200).send('this route works');
  try {
    const { username, password } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 5);
    let newUser = await userModel.create({
      username,
      password: encryptedPassword,
    });
      res.status(200).send(newUser);
  } catch(err){
    console.error(err);
    next('signup error occurred');
  }
});

// signin will require basic auth middleware that PROVES the signin password is equivalent to the hashed password that we have saved in our DB
app.post('/signin', basicAuth, (req, res, next) => {
  res.status(200).send(req.user);
})

sequelize.sync()
  .then(() => {
    console.log('Successful DB connection');
    app.listen(PORT, () => console.log('listening on port: ', PORT));
  })
  .catch((err) => console.error(err));
