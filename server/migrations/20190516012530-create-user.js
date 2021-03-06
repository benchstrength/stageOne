'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      },
      firstName: {
          type: Sequelize.STRING,
          allowNull: true
      },
      lastName: {
          type: Sequelize.STRING,
          allowNull: true
      },
      isEmployee: {
          type: Sequelize.BOOLEAN,
          allowNull: false
      },
      isActive: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
          allowNull: false
      },
      img_url:{
          type: Sequelize.STRING,
          allowNull: true
      },
      startTOD: {
          type: Sequelize.STRING,
          allowNull: true
      },
      endTOD: {
          type: Sequelize.STRING,
          allowNull: true
      },
      roleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Roles',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};