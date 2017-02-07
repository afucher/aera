'use strict';
module.exports = function(sequelize, DataTypes) {
  var Client = sequelize.define('Client', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    cpf: DataTypes.STRING,
    phone: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.Client.belongsToMany(models.Group,{
          through: models.ClientGroup,
          foreignKey: 'client_id',
          as: 'Groups'
        });
      }
    }
  });
  return Client;
};