'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.addColumn(
        'Groups',
        'teacher_id',
        {
            type: Sequelize.INTEGER,
            references: {model:"Clients", key:"id"}
        }
    );
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.removeColumn('Groups','teacher_id');
  }
};