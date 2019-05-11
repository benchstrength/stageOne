module.exports = (sequelize, DataTypes) => {

    class CommunicationType extends sequelize.Sequelize.Model {}

    CommunicationType.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    { sequelize });

    CommunicationType.associate = (models) => {
        CommunicationType.belongsToMany(models.User, {
            through: models.CommunicationPref,
        })
    }

    return CommunicationType;
}