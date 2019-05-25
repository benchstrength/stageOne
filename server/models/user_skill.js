'use strict';
module.exports = (sequelize, DataTypes) => {

  class user_skill extends sequelize.Sequelize.Model {}

  user_skill.init({
    self_rating: DataTypes.INTEGER,
    employer_rating: DataTypes.INTEGER,
    interest: DataTypes.INTEGER,
    UserEmail: DataTypes.STRING,
    SkillId: DataTypes.INTEGER
  }, {sequelize});
  
  user_skill.associate = function(models) {
    // associations can be defined here
  };

  return user_skill;
  
};