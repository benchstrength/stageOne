module.exports = (sequelize, DataTypes) => {

    class IDE_Pref extends sequelize.Sequelize.Model {}

    IDE_Pref.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rank: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        current: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false
        }
    }, {
        sequelize
    });

    return IDE_Pref;
}