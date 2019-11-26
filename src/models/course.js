'use strict';
module.exports = function(sequelize, DataTypes) {
  const Course = sequelize.define('Course', {
    code: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    courseLoad: DataTypes.INTEGER
  });

  
  return Course;
};