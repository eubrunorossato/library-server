const Books = require('../models/books');
const { connection } = require('../database/index');
const { QueryTypes } = require('sequelize');

const checkValues = (book) => {
  if (book.name === '' || book.author === '' || book.gender === '' || book.realeased_date === '' || (!book.name || !book.author || !book.gender || !book.realeased_date)) {
    throw new Error('Missing required fields');
  }
};

module.exports = {
  create: async (body, imgBuffer) => {
    try {
      checkValues(body)
      const { name, author, gender, realeased_date } = body;
      const book = await Books.create({ name, author, gender, realeased_date, book_picture: imgBuffer });
      return {
        code: 200,
        message: `Book ${book.name} was registered sucessfully`
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
      const books = await connection.query('select * from "Books"', {
        type: QueryTypes.SELECT
      });
      return {
        code: 200,
        books,
      }
    } catch (error) {
      return {
        code: 500,
        message: error.message
      }
    }
  }
}