'use strict';

const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

module.exports = (sequelize, DataTypes) => {
  // creating a "user variable instead of just returning so that I can attach methods used by middleware"
  const user = sequelize.define('users', {
    // the big diff:  notice there is no return
    // use SAME property names always
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {  // NEVER include a password in your token
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM,
      values: ['user', 'writer', 'editor', 'admin'],
      defaultValue: 'user',
    },
    token: {
      type: DataTypes.VIRTUAL,
      //when I access the user data, this get method will generate the virtual AT THAT MOMENT.  we do not expect a "token" column in the users table
      get() {
        // json web token is the equivalent of "token" 
        return jwt.sign({
          username: this.username,
          capabilities: this.capabilities,
        }, SECRET, { expiresIn: 1000 * 60 * 60 * 24 * 7});
      },
      set() {
        // not using this today, showing what it could look like 
        return jwt.sign({username: this.username}, SECRET, { expiresIn: 1000 * 60 * 60 * 24 * 7});
      },
    },
    capabilities: {
      type: DataTypes.VIRTUAL,
      get(){
        const acl = {
          user: ['read'],
          writer: ['read', 'create'],
          editor: ['read', 'create', 'update'],
          admin: ['read', 'create', 'update', 'delete'],
        };
        return acl[this.role];
      },
    },
  });
  // hey, this middleware exists!   I can interact with the user before creating the record in our DB
  // user.beforeCreate((user) => {
  //   console.log('our user before being added to DB', user);
  // });

  user.authenticateBearer = async (token) => {
    try {
      // this gives us the object stored in token.  see first parameter in jwt.sign() above
      let payload = jwt.verify(token, SECRET);
      console.log('payload:', payload);
      const singleUser = await user.findOne({where: {username: payload.username}});
      if(singleUser) return singleUser;

    } catch (e){
      // console.log('error in authenticateBearer method.  message', e.message);
      console.error(e);
      return e;
    }
  };

  return user;
};
