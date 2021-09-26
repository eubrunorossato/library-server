const books = require('./services/books');
const genre = require('./services/genre');

module.exports = (app) => {
  app.post('/api/genre/create', async (req, res, next) => {
    const { code, message } = await genre.create(req.body);
    res.status(code).json(message);
    next();
  });
  app.get('/api/genre/getAll', async (req, res, next) => {
    const { code, genres } = await genre.getAll();
    res.status(code).json(genres);
    next();
  });

  app.post('/api/books/create', async (req, res, next) => {
    const { data } = req.files.book_picture;
    const { code, message } = await books.create(req.body, data);
    res.status(code).json(message);
    next();
  });
  app.get('/api/books/getAll', async (req, res, next) => {
    const response = await books.getAll();
    res.json(response);
    next();
  });
}