'use strict';
module.exports = function(sequelize, DataTypes) {
  var Class = sequelize.define('Class', {
    group_id: DataTypes.INTEGER,
    attendance_info: DataTypes.JSON,
    date: DataTypes.DATEONLY,
    observation: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.Class.belongsTo(models.Group,{foreignKey:'group_id'});
      }
    }
  });
  return Class;
};