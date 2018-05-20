'use strict';
module.exports = function (sequelize, DataTypes) {
  var Client = sequelize.define('Client', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    cpf: DataTypes.STRING,
    teacher: DataTypes.BOOLEAN,
    phone: DataTypes.STRING,
    cel_phone: DataTypes.STRING,
    com_phone: DataTypes.STRING,
    address1: DataTypes.STRING,
    address2: DataTypes.STRING,
    address3: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip_code: DataTypes.STRING(8),
    profession: DataTypes.STRING,
    edu_lvl: DataTypes.STRING,
    old_code: DataTypes.STRING(10),
    birth_date: {
      type: DataTypes.DATEONLY(),
      get: function (field) {
        return getDateWithoutTime(this.getDataValue(field))
      }
    },
    birth_hour: DataTypes.TIME(),
    birth_place: DataTypes.STRING(50),
    note: DataTypes.TEXT()
  }, {
      classMethods: {
        associate: function (models) {
          // associations can be defined here
          models.Client.belongsToMany(models.Group, {
            through: models.ClientGroup,
            foreignKey: 'client_id',
            as: 'Groups',
            primaryKeyDeleted: false
          });
          models.Client.hasMany(models.ClientGroup, {
            foreignKey: 'client_id',
            primaryKeyDeleted: false
          });
          models.Client.belongsToMany(models.Payment, {
            through: models.ClientGroup,
            foreignKey: 'client_id',
            otherKey: 'id',
            as: 'Payments',
            primaryKeyDeleted: false
          });
        }
      }
    });
  return Client;
};

function getDateWithoutTime(date) {
  return date ? require('moment')(date).format('DD/MM/YYYY') : date;
}