const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres', 'brunorossato', 'suamae', {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = sequelize;