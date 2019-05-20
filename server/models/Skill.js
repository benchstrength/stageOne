module.exports = (sequelize, DataTypes) => {

    class Skill extends sequelize.Sequelize.Model{}

    Skill.init({
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
    { sequelize });

    Skill.user_skill = {
        self_rating: null,
        employer_rating: null,
        interest: null
    }

    Skill.associate = (models) => {
        Skill.belongsToMany(models.User, {
            through: models.user_skill
        });

        Skill.belongsToMany(Skill, { as: 'reliesOn', through: 'SkillReliesOn'});

        Skill.belongsToMany(models.ProgrammingArea, {through: 'Skill_ProgrammingArea'});
    }

    return Skill;
}