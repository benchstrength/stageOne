module.exports = (sequelize, DataTypes) => {

    class UserSkill extends sequelize.Sequelize.Model {}

    UserSkill.init({
        interest: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        ownRating: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        employerRating: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        gitRepo: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, 
    { sequelize });

    return UserSkill;
}