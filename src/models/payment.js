'use strict';


module.exports = function (sequelize, DataTypes) {
  var Payment = sequelize.define('Payment', {
    id: {
      type: DataTypes.INTEGER,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    value: DataTypes.DECIMAL(10,2),
    paid: DataTypes.BOOLEAN,
    installment: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    dueDate: {
      type: DataTypes.DATEONLY,
      get: function (field) {
        return getDateWithoutTime(this.getDataValue(field))
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        models.Payment.belongsTo(models.Client, { foreignKey: 'client_id' });
        // associations can be defined here
      }
    }
  });
  return Payment;
};


function getDateWithoutTime(date) {
  return require('moment')(date).format('DD/MM/YYYY');
}