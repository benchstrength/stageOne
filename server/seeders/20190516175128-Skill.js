'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Skills', [
      { name: 'HTML/CSS', createdAt: Date.now(), updatedAt: Date.now() },
      { name: 'JQuery', createdAt: Date.now(), updatedAt: Date.now() },
      { name: 'Angular', createdAt: Date.now(), updatedAt: Date.now() },
      { name: 'TypeScript', createdAt: Date.now(), updatedAt: Date.now() },
      { name: 'SCSS', createdAt: Date.now(), updatedAt: Date.now() },
      { name: 'LESS', createdAt: Date.now(), updatedAt: Date.now() },
      { name: 'Webpack', createdAt: Date.now(), updatedAt: Date.now() },
      { name: 'NodeJS', createdAt: Date.now(), updatedAt: Date.now() },
      { name: 'Express', createdAt: Date.now(), updatedAt: Date.now() },
      { name: 'React', createdAt: Date.now(), updatedAt: Date.now() },
      { name: 'Redux', createdAt: Date.now(), updatedAt: Date.now() },
      { name: 'Vue', createdAt: Date.now(), updatedAt: Date.now() },
      { name: 'Django', createdAt: Date.now(), updatedAt: Date.now() },
      { name: 'PHP', createdAt: Date.now(), updatedAt: Date.now() },
      { name: 'MSSQL', createdAt: Date.now(), updatedAt: Date.now() },
      { name: 'MySQL', createdAt: Date.now(), updatedAt: Date.now() },
      { name: 'Postgres', createdAt: Date.now(), updatedAt: Date.now() },
      { name: 'Mongo', createdAt: Date.now(), updatedAt: Date.now() },
      { name: 'Sequelize', createdAt: Date.now(), updatedAt: Date.now() },
      { name: 'Mongoose', createdAt: Date.now(), updatedAt: Date.now() },
      { name: 'Eloquent', createdAt: Date.now(), updatedAt: Date.now() },
      { name: 'Redis', createdAt: Date.now(), updatedAt: Date.now() },
      { name: 'Laravel', createdAt: Date.now(), updatedAt: Date.now() },
      { name: 'Gulp', createdAt: Date.now(), updatedAt: Date.now() },
      { name: 'Grunt', createdAt: Date.now(), updatedAt: Date.now() },
      { name: 'Elixir', createdAt: Date.now(), updatedAt: Date.now() },
      { name: 'Git', createdAt: Date.now(), updatedAt: Date.now() },
      { name: 'Linting', createdAt: Date.now(), updatedAt: Date.now() },
      { name: 'Ruby', createdAt: Date.now(), updatedAt: Date.now() },
      { name: 'Rails', createdAt: Date.now(), updatedAt: Date.now() },
      { name: 'Perl', createdAt: Date.now(), updatedAt: Date.now() },
      { name: 'Python', createdAt: Date.now(), updatedAt: Date.now() },
      { name: 'Bash/Command Line Scripting', createdAt: Date.now(), updatedAt: Date.now() },
      { name: 'Responsive Design', createdAt: Date.now(), updatedAt: Date.now() },
      { name: 'UX', createdAt: Date.now(), updatedAt: Date.now() },
      { name: 'Slack', createdAt: Date.now(), updatedAt: Date.now() },
      { name: 'Machine Learning', createdAt: Date.now(), updatedAt: Date.now() },
      { name: 'AI', createdAt: Date.now(), updatedAt: Date.now() },
      { name: 'ARKit', createdAt: Date.now(), updatedAt: Date.now() },
      { name: 'E2E QA', createdAt: Date.now(), updatedAt: Date.now() },
      { name: 'Unit Testing / QA', createdAt: Date.now(), updatedAt: Date.now() },
      { name: 'Nix Server Management', createdAt: Date.now(), updatedAt: Date.now() },
      { name: 'AWS', createdAt: Date.now(), updatedAt: Date.now() },
      { name: 'Kentico', createdAt: Date.now(), updatedAt: Date.now() },
      { name: 'C#', createdAt: Date.now(), updatedAt: Date.now() },
      { name: '.NET', createdAt: Date.now(), updatedAt: Date.now() },
      { name: 'CakePHP', createdAt: Date.now(), updatedAt: Date.now() },
      { name: 'CMS', createdAt: Date.now(), updatedAt: Date.now() },
      { name: 'Swift', createdAt: Date.now(), updatedAt: Date.now() },
      { name: 'Java', createdAt: Date.now(), updatedAt: Date.now() },
      { name: 'Kotlin', createdAt: Date.now(), updatedAt: Date.now() },
      { name: 'VirtualBox', createdAt: Date.now(), updatedAt: Date.now() },
      { name: 'Vagrant', createdAt: Date.now(), updatedAt: Date.now() },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
