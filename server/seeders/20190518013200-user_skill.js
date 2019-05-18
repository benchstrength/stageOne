'use strict';

// 1-4 rating

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('user_skills', [
      {
        SkillId: 1,
        UserEmail: "tedEncyclopaedia@himym.com",
        self_rating: 3,
        employer_rating: 3,
        interest: 4,
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
