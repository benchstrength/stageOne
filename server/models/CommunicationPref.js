'use strict';
module.exports = (sequelize, DataTypes) => {

  class CommunicationPref extends sequelize.Sequelize.Model {}

  CommunicationPref.init({
      rank: {
          type: DataTypes.INTEGER,
          allowNull: false
      }
  },
  { sequelize });

  return CommunicationPref;
}