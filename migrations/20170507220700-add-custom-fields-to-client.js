'use strict';
module.exports = {
    up: function (queryInterface, Sequelize) {
        let migrations = [];
        migrations.push(queryInterface.addColumn(
            'Clients',
            'profession',
            {
                type: Sequelize.STRING()
            }
        ));
        migrations.push(queryInterface.addColumn(
            'Clients',
            'edu_lvl',
            {
                type: Sequelize.STRING()
            }
        ));
        migrations.push(queryInterface.addColumn(
            'Clients',
            'old_code',
            {
                type: Sequelize.STRING(10)
            }
        ));
        return Promise.all(migrations)
    },
    down: function (queryInterface, Sequelize) {
        let migrations = [];
        migrations.push(queryInterface.removeColumn('Clients', 'profession'));
        migrations.push(queryInterface.removeColumn('Clients', 'edu_lvl'));
        migrations.push(queryInterface.removeColumn('Clients', 'old_code'));
        return Promise.all(migrations);
    }
};