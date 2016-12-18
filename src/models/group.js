'use strict';
module.exports = function(sequelize, DataTypes) {
  var Group = sequelize.define('Group', {
    course_id: DataTypes.INTEGER,
    start_date: DataTypes.DATEONLY,
    class_info: DataTypes.JSON
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.Group.belongsTo(models.Course, {foreignKey: 'course_id'});
        models.Group.belongsToMany(models.Student,{
          through: models.StudentGroup,
          foreignKey: 'group_id',
          as:'Students'
        });
        models.Group.hasMany(models.Class,{foreignKey: 'group_id'});
      }
    }
  });
  return Group;
};