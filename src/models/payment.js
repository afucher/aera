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
  },{
    classMethods: {
      associate: function (models) {
        // associations can be defined here
        models.Payment.belongsTo(models.ClientGroup, { foreignKey: 'clientGroup_id' });
      }
    }
  });
  return Payment;
};


function getDateWithoutTime(date) {
  return require('moment')(date).format('DD/MM/YYYY');
}