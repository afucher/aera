'use strict';
module.exports = function(sequelize, DataTypes) {
  var StudentGroup = sequelize.define('StudentGroup', {
    student_id: DataTypes.INTEGER,
    group_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return StudentGroup;
};