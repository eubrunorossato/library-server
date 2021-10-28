const Sequelize = require('sequelize');
const Book = require('../models/book');
const Author = require('../models/author');
const Genre = require('../models/genre');
const User = require('../models/users');
const Requests = require('../models/requests')
const databaseConfig = require('../config/database');

const models = [Genre, Book, Author, User, Requests];
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
