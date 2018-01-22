'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Payments', {
      clientGroup_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      value: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false
      },
      paid: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      due_date: {
        type: Sequelize.DATEONLY
      },
      installment: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
        primaryKey: true
      },
      note: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    },
    {
        indexes: [
            {
                unique: true,
                fields: ['clientGroup_id', 'installment']
            }
        ]
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Payments');
  }
};