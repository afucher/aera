'use strict';


module.exports = function (sequelize, DataTypes) {
  var Group = sequelize.define('Group', {
    course_id: DataTypes.INTEGER,
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
        return this.getDataValue(field).substr(0,5)
      }
    },
    end_hour: {
      type: DataTypes.TIME,
      get: function (field) {
        return this.getDataValue(field).substr(0,5)
      }
    },
    class_info: DataTypes.JSON
  }, {
      classMethods: {
        associate: function (models) {
          // associations can be defined here
          models.Group.belongsTo(models.Course, { foreignKey: 'course_id' });
          models.Group.belongsToMany(models.Client, {
            through: models.ClientGroup,
            foreignKey: 'group_id',
            as: 'Students'
          });
          models.Group.hasMany(models.Class, { foreignKey: 'group_id' });
        }
      }
    });
  return Group;
};

function getDateWithoutTime(date) {
  return require('moment')(date).format('DD/MM/YYYY');
}