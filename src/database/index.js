const Sequelize = require('sequelize');
const Books = require('../models/books');
const databaseConfig = require('../config/database');

const models = [Books];

module.exports = () => {
  const connection = new Sequelize(databaseConfig)
  connection.sync();
  models.map(model => model.init(connection));
}