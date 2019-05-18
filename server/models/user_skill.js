'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_skill = sequelize.define('user_skill', {
    self_rating: DataTypes.INTEGER,
    employer_rating: DataTypes.INTEGER,
    interest: DataTypes.INTEGER,
    UserEmail: DataTypes.STRING,
    skillId: DataTypes.INTEGER
  }, {});
  user_skill.associate = function(models) {
    // associations can be defined here
  };
  return user_skill;
};