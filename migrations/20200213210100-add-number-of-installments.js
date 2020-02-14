'use strict';
module.exports = {
  up: function(migration, DataTypes) {
    return migration.sequelize.transaction(t => {  
      return Promise.all([
        migration.addColumn(
          'Payments',
          'number_installments',
          {
              type: DataTypes.INTEGER
          },{ transaction: t }),
          migration.sequelize.query('UPDATE "Payments" AS TBL1 SET "number_installments" = (SELECT MAX(UPD.installment) FROM "Payments" AS UPD where UPD."clientGroup_id" = TBL1."clientGroup_id")',{ transaction: t })
      ]);
    });
    
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.removeColumn('Payments','number_installments');
  }
};