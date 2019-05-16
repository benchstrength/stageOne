'use strict';
module.exports = (sequelize, DataTypes) => {

  const Skill = Skill.define('Skill', {
      name: {
          type: DataTypes.STRING,
          allowNull: false
      },
      description: {
          type: DataTypes.STRING(1000),
          allowNull: true
      },
      isActive: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true
      },
      required: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0
      },
  },
  {});

  Skill.associate = (models) => {
      Skill.belongsToMany(models.User, {
          through: models.UserSkill
      });

      Skill.belongsToMany(Skill, { as: 'reliesOn', through: 'SkillReliesOn'});

      Skill.belongsToMany(models.ProgrammingArea, {through: 'Skill_ProgrammingArea'});
  }

  return Skill;
}