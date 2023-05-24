'use strict';

const base64 = require('base-64');
const bcrypt = require('bcrypt');
const { userModel } = require('../../models');


const basicAuth = async (req, res, next) => {
  let { authorization } = req.headers;
  // console.log('authorization: ', authorization);
  //                                            Basic username:password
  // 1. isolate the encoded part of the string - Basic UnlhbjpwYXNz
  let authString = authorization.split(' ')[1];
  console.log('authString:', authString);

  // 2. decode the authstring
  let decodedAuthString = base64.decode(authString);
  console.log('decodedAuthString:', decodedAuthString);

  // 3. I need to isolate the password FROM the decoded string
  let [username, password] = decodedAuthString.split(':');
  // console.log('password:', password);
  
  let user = await userModel.findOne({where: { username }});
  // console.log('here.........user:', user);
  if (user){
    let validUser = await bcrypt.compare(password, user.password);
    if(validUser){
      req.user = user;
      next();
    } else {
      next('Not authorized (incorrect password)');
    }
  } else {
    next('Not authorized (user doesn\'t exist in DB)');
  }
};

module.exports = basicAuth;
