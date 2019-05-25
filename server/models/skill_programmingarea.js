'use strict';
module.exports = (sequelize, DataTypes) => {
  class skill_programmingarea extends sequelize.Sequelize.Model {}
  
  skill_programmingarea.init({
    ProgrammingAreaId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    SkillId: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, { sequelize });
  skill_programmingarea.associate = function(models) {
    // associations can be defined here
  };
  return skill_programmingarea;
};