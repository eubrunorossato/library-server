const Books = require('../models/books');

const checkValues = (book) => {
  if (book.name === '' && book.author === '' && book.gender === '' && book.realeased_date === '' || (!book.name && !book.author && !book.gender && !book.realeased_date && book.isAvaliable === undefined)) {
    throw new Error('Missing required fields');
  }
};

module.exports = {
  create: (body, res) => {
    try {
      checkValues(book)
      const { name, author, gender, realeased_date, isAvaliable } = body;
      const book = Books.create({ name, author, gender, realeased_date, isAvaliable });
      return {
        code: 200,
        message: `Book ${book.name} was registered sucessfully`
      }
    } catch (error) {
      return {
        code: 500,
        message: error
      }
    }

  }
}