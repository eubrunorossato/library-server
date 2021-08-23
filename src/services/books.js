const Books = require('../models/books');

const checkValues = (book) => {
  if (book.name === '' || book.author === '' || book.gender === '' || book.realeased_date === '' || (!book.name || !book.author || !book.gender || !book.realeased_date)) {
    throw new Error('Missing required fields');
  }
};

module.exports = {
  create: async (body) => {
    try {
      checkValues(body)
      const { name, author, gender, realeased_date } = body;
      const book = await Books.create({ name, author, gender, realeased_date });
      console.log(book);
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

  }
}