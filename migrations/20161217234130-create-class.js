/*'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Classes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      group_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: 'uniqueClassGroup'
      },
      attendance_info: {
        type: Sequelize.JSON
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        unique: 'uniqueClassGroup'
      },
      observation: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    },{
      uniqueKeys:{
        uniqueClassGroup:{fields:['group_id','date']}
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Classes');
  }
};
*/