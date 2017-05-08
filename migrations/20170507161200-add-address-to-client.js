'use strict';
module.exports = {
    up: function (queryInterface, Sequelize) {
        let migrations = [];
        migrations.push(queryInterface.addColumn(
            'Clients',
            'address1',
            {
                type: Sequelize.STRING()
            }
        ));
        migrations.push(queryInterface.addColumn(
            'Clients',
            'address2',
            {
                type: Sequelize.STRING()
            }
        ));
        migrations.push(queryInterface.addColumn(
            'Clients',
            'address3',
            {
                type: Sequelize.STRING()
            }
        ));
        migrations.push(queryInterface.addColumn(
            'Clients',
            'city',
            {
                type: Sequelize.STRING()
            }
        ));
        migrations.push(queryInterface.addColumn(
            'Clients',
            'state',
            {
                type: Sequelize.STRING()
            }
        ));
        migrations.push(queryInterface.addColumn(
            'Clients',
            'zip_code',
            {
                type: Sequelize.STRING(8)
            }
        ));
        return Promise.all(migrations)
    },
    down: function (queryInterface, Sequelize) {
        let migrations = [];
        migrations.push(queryInterface.removeColumn('Clients', 'address1'));
        migrations.push(queryInterface.removeColumn('Clients', 'address2'));
        migrations.push(queryInterface.removeColumn('Clients', 'address3'));
        migrations.push(queryInterface.removeColumn('Clients', 'city'));
        migrations.push(queryInterface.removeColumn('Clients', 'state'));
        migrations.push(queryInterface.removeColumn('Clients', 'zip_code'));
        return Promise.all(migrations);
    }
};