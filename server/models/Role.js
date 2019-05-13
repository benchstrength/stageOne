module.exports = (sequelize, DataTypes) => {

    class Role extends sequelize.Sequelize.Model {}

    Role.init({

        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        parent: 
    })
}