'use strict';


module.exports = function (sequelize, DataTypes) {
  const dateOnlyField = {
    type: DataTypes.DATEONLY,
    get: function (field) {
      return getDateWithoutTime(this.getDataValue(field))
    }
  };
  var Group = sequelize.define('Group', {
    course_id: DataTypes.INTEGER,
    start_date: dateOnlyField,
    end_date: dateOnlyField,
    start_hour: DataTypes.TIME,
    end_hour: DataTypes.TIME,
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