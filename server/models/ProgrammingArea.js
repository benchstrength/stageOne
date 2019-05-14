module.exports = (sequelize, DataTypes) => {

    class ProgrammingArea extends sequelize.Sequelize.Model {}

    ProgrammingArea.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {sequelize});

    ProgrammingArea.associate = (models) => {
        ProgrammingArea.belongsToMany(models.Skill, {
            through: "Skill_ProgrammingArea"
        });
    }

    return ProgrammingArea;
}