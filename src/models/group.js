'use strict';


module.exports = function (sequelize, DataTypes) {
  var Group = sequelize.define('Group', {
    course_id: DataTypes.INTEGER,
    teacher_id: DataTypes.INTEGER,
    classes: DataTypes.INTEGER,
    start_date: {
      type: DataTypes.DATEONLY,
      get: function (field) {
        return getDateWithoutTime(this.getDataValue(field))
      }
    },
    end_date: {
      type: DataTypes.DATEONLY,
      get: function (field) {
        return getDateWithoutTime(this.getDataValue(field))
      }
    },
    start_hour: {
      type: DataTypes.TIME,
      get: function (field) {
        let value = this.getDataValue(field)
        return value ? value.substr(0,5) : value;
      }
    },
    end_hour: {
      type: DataTypes.TIME,
      get: function (field) {
        let value = this.getDataValue(field)
        return value ? value.substr(0,5) : value;
      }
    },
    class_info: DataTypes.JSON
  });

  Group.associate = function (models) {
    // associations can be defined here
    models.Group.belongsTo(models.Course, { foreignKey: 'course_id' });
    models.Group.belongsToMany(models.Client, {
      through: models.ClientGroup,
      foreignKey: 'group_id',
      as: 'Students'
    });
    models.Group.belongsTo(models.Client, { foreignKey: 'teacher_id',as:'Teacher' } );
    //models.Group.hasMany(models.Class, { foreignKey: 'group_id' });
  }
  return Group;
};

function getDateWithoutTime(date) {
  return require('moment')(date,'YYYY-MM-DD').format('DD/MM/YYYY');
}