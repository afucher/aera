'use strict';
module.exports = function(sequelize, DataTypes) {
  const ClientGroup = sequelize.define('ClientGroup', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    client_id: DataTypes.INTEGER,
    group_id: DataTypes.INTEGER,
    attendance: DataTypes.INTEGER
  });

  ClientGroup.associate = function(models) {
    // associations can be defined here
    models.ClientGroup.hasMany(models.Payment, {foreignKey: 'clientGroup_id', sourceKey: 'id'})
    models.ClientGroup.belongsTo(models.Client, {foreignKey: 'client_id'})
    models.ClientGroup.belongsTo(models.Group, {foreignKey: 'group_id'})
  }

  return ClientGroup;
};