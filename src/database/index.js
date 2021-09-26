const Sequelize = require('sequelize');
const Books = require('../models/books');
const Author = require('../models/author');
const Genre = require('../models/genre');
const databaseConfig = require('../config/database');

const models = [Books,Author, Genre];
const connection = new Sequelize(databaseConfig);

const createConnection = () => {
  connection.sync();
  models.map(model => model.init(connection));
};

module.exports = {
  createConnection, connection
}
