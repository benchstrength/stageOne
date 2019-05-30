'use strict';
module.exports = (sequelize, DataTypes) => {
  class Skill_ProgrammingArea extends sequelize.Sequelize.Model {}
  
  Skill_ProgrammingArea.init({
    ProgrammingAreaId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    SkillId: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, { sequelize });
  Skill_ProgrammingArea.associate = function(models) {
    // associations can be defined here
  };
  return Skill_ProgrammingArea;
};
