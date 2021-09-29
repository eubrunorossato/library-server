const Books = require('../models/book');
const Genre = require('../models/genre');
const Author = require('../models/author');

const checkValues = (book, imgBuffer) => {
  if (book.name === '' || book.author_id === '' || book.genre_id === '' || book.resume === '' || (!book.name || !book.author_id || !book.genre_id || !book.resume || imgBuffer === undefined || imgBuffer === null || imgBuffer === '')) {
    throw new Error('Missing required fields');
  }
};

module.exports = {
  create: async (body, imgBuffer) => {
    try {
      console.log(body, imgBuffer);
      checkValues(body, imgBuffer)
      const { name, author_id, genre_id, resume } = body;
      const book = await Books.create({ name, author_id, genre_id, book_picture: imgBuffer, resume });
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
            'genre_id',
            'author_id',
          ]
        },
        include: [
          {model: Genre},
          {model: Author}
        ]
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