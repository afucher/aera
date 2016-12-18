'use strict';
module.exports = function(sequelize, DataTypes) {
  const Course = sequelize.define('Course', {
    code: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Course;
};