const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Blague = sequelize.define('Blague', {
  question: {
    type: DataTypes.STRING,
    allowNull: false
  },
  reponse: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Blague;
