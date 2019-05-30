'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ProgrammingAreas', [
      {
        name: "Client",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Server",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "DevOps",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
