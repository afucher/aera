'use strict';
module.exports = {
    up: function (queryInterface, Sequelize) {
        let migrations = [];
        migrations.push(queryInterface.addColumn(
            'Clients',
            'cel_phone',
            {
                type: Sequelize.STRING(20)
            }
        ));
        migrations.push(queryInterface.addColumn(
            'Clients',
            'com_phone',
            {
                type: Sequelize.STRING(20)
            }
        ));
        return Promise.all(migrations)
    },
    down: function (queryInterface, Sequelize) {
        let migrations = [];
        migrations.push(queryInterface.removeColumn('Clients', 'cel_phone'));
        migrations.push(queryInterface.removeColumn('Clients', 'com_phone'));
        return Promise.all(migrations);
    }
};