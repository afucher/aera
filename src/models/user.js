'use strict';
const bcrypt = require('bcrypt');
module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
      hooks: {
        beforeCreate: user => {
          const salt = bcrypt.genSaltSync();
          user.password = bcrypt.hashSync(user.password, salt);
        }
      }
    });

  User.prototype.comparePassword = function(password, cb) {
    bcrypt.compare(password, this.password, cb)
  }
  return User;
};