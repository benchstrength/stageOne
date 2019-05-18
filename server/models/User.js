'use strict'
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
    },
    { sequelize });

    User.associate = (models) => {
        User.hasMany(models.IDE_Pref);
        User.belongsToMany(models.Skill, {
            through: 'user_skills'
        });
        User.hasOne(models.Role);
    }

    return User;
}