'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.addColumn(
        'Groups',
        'classes',
        {
            type: Sequelize.INTEGER
        }
    );
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.removeColumn('Groups','classes');
  }
};