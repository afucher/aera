'use strict';


module.exports = function (sequelize, DataTypes) {
  var Payment = sequelize.define('Payment', {
    clientGroup_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    value: DataTypes.DECIMAL(10,2),
    paid: DataTypes.BOOLEAN,
    installment: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    due_date: {
      type: DataTypes.DATEONLY,
      get: function (field) {
        return getDateWithoutTime(this.getDataValue(field))
      }
    }
  });

  Payment.associate = function (models) {
    // associations can be defined here
    models.Payment.belongsTo(models.ClientGroup, { foreignKey: 'clientGroup_id' });
    models.Payment.belongsTo(models.Group,{
      through: models.ClientGroup,
      foreignKey: 'clientGroup_id',
      otherKey: 'id',
      as: 'Group',
      primaryKeyDeleted: false
    });
  }
  return Payment;
};


function getDateWithoutTime(date) {
  return require('moment')(date).format('DD/MM/YYYY');
}