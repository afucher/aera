'use strict';
module.exports = function(sequelize, DataTypes) {
  var ClientGroup = sequelize.define('ClientGroup', {
    client_id: DataTypes.INTEGER,
    group_id: DataTypes.INTEGER,
    attendance: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return ClientGroup;
};