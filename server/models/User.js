module.exports = (sequelize, DataTypes) => {

    class User extends sequelize.Sequelize.Model {}

    User.init({
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        isEmployee: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        isSuperAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        img_url:{
            type: DataTypes.STRING,
            allowNull: true
        },
        startTOD: {
            type: DataTypes.STRING,
            allowNull: true
        },
        endTOD: {
            type: DataTypes.STRING,
            allowNull: true
        },
        role: {
            type: DataTypes.INTEGER,
            allowNull: false,
            default: "user"
        }
    },
    { sequelize });

    User.associate = (models) => {
        User.hasMany(models.IDE_Pref);
        User.belongsToMany(models.Skill, {
            through: models.UserSkill
        });
    }

    return User;
}