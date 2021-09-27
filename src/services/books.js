const Books = require('../models/book');
const Genre = require('../models/genre');

const checkValues = (book, imgBuffer) => {
  if (book.name === '' || book.author === '' || book.genre_id === '' || book.resume === '' || (!book.name || !book.author || !book.genre_id || !book.resume || imgBuffer === undefined || imgBuffer === null || imgBuffer === '')) {
    throw new Error('Missing required fields');
  }
};

module.exports = {
  create: async (body, imgBuffer) => {
    try {
      checkValues(body, imgBuffer)
      const { name, author, genre_id, resume } = body;
      const book = await Books.create({ name, author, genre_id, book_picture: imgBuffer, resume });
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
      const books = await Books.findAll({
        attributes: {
          exclude: [
            'genre_id'
          ]
        },
        include: {
          model: Genre
        }
      })
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