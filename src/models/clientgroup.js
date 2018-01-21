'use strict';
module.exports = function(sequelize, DataTypes) {
  var ClientGroup = sequelize.define('ClientGroup', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    client_id: DataTypes.INTEGER,
    group_id: DataTypes.INTEGER,
    attendance: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.ClientGroup.hasMany(models.Payment, {foreignKey: 'clientGroup_id', sourceKey: 'id'})
      }
    }
  });
  return ClientGroup;
};