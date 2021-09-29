const Genre = require('../models/genre');
const { connection } = require('../database/index');
const { QueryTypes } = require('sequelize');

const checkValues = (genre) => {
  if (genre.name === '' || !genre.name || genre.name === null) {
    throw new Error('Missing required fields');
  }
};

module.exports = {
  create: async (body) => {
    try {
      checkValues(body)
      const { name } = body;
      const genre = await Genre.create({ name });
      return {
        code: 200,
        message: `Genre ${genre.name} was registered sucessfully`
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
      const genres = await connection.query('select * from "genres"', {
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