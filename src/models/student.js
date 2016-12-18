'use strict';
module.exports = function(sequelize, DataTypes) {
  var Student = sequelize.define('Student', {
    name: DataTypes.STRING,
    code: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.Student.belongsToMany(models.Group,{
          through: models.StudentGroup,
          foreignKey: 'student_id',
          as: 'Groups'
        });
      }
    }
  });
  return Student;
};