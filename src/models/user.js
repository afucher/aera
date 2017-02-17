'use strict';
const bcrypt = require('bcrypt');
module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
      classMethods: {
        associate: function (models) {
          // associations can be defined here
        }
      },
      instanceMethods: {
        comparePassword: function(password, cb) {
          bcrypt.compare(password, this.password, cb)
        }
      },
      hooks: {
        beforeCreate: user => {
          const salt = bcrypt.genSaltSync();
          user.password = bcrypt.hashSync(user.password, salt);
        }
      }
    });
  return User;
};