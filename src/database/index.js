const Sequelize = require('sequelize');
const Books = require('../models/book');
// const Author = require('../models/author');
const Genre = require('../models/genre');
const databaseConfig = require('../config/database');

const models = [Genre, Books];
const connection = new Sequelize(databaseConfig);

const createConnection = () => {
  connection.sync();
  models.map(model => model.init(connection));
  models.map(
    model => model.associate && model.associate(connection.models)
  )
};

module.exports = {
  createConnection, connection
}
