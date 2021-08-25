const Sequelize = require('sequelize');
const Books = require('../models/books');
const databaseConfig = require('../config/database');

const models = [Books];
const connection = new Sequelize(databaseConfig);

const createConnection = () => {
  connection.sync();
  models.map(model => model.init(connection));
};

module.exports = {
  createConnection, connection
}
