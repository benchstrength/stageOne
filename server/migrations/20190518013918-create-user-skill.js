'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user_skills', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserEmail: {
        type: Sequelize.STRING
      },
      SkillId: {
        type: Sequelize.STRING
      },
      self_rating: {
        type: Sequelize.INTEGER
      },
      employer_rating: {
        type: Sequelize.INTEGER
      },
      interest: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('user_skills');
  }
};