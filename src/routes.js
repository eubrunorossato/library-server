const { create, getAll } = require('./services/books');

module.exports = (app) => {
  app.post('/api/books/create', async (req, res, next) => {
    const { data } = req.files.book_picture;
    const { code, message } = await create(req.body, data);

    res.status(code).json(message);
    next();
  });

  app.get('/api/books/getAll', async (req, res, next) => {
    const response = await getAll();
    res.json(response);
    next();
  });
}