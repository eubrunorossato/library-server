const Author = require('../models/author');
const { connection } = require('../database/index');
const { QueryTypes } = require('sequelize');

const checkValues = (author) => {
  if (author.name === '' || !author.name || author.name === null) {
    throw new Error('Missing required fields');
  }
};

module.exports = {
  create: async (body) => {
    try {
      checkValues(body)
      const { name } = body;
      const author = await Author.create({ name });
      return {
        code: 200,
        message: `Author ${author.name} was registered sucessfully`
      }
    } catch (error) {
      return {
        code: 500,
        message: error.message
      }
    }
  },
  getAll: async () => {
    try {
      const genres = await connection.query('select * from "authors"', {
        type: QueryTypes.SELECT
      });
      return {
        code: 200,
        genres,
      }
    } catch (error) {
      return {
        code: 500,
        message: error.message
      }
    }
  }
}