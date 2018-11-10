'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.sequelize.query('alter table "Payments" add constraint fkey_group_client foreign key ("clientGroup_id") references "ClientGroups";')
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.sequelize.query('ALTER TABLE "Payments" DROP CONSTRAINT fkey_group_client;')
  }
};