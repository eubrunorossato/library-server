const { create } = require('./services/books');

module.exports = (app) => {
  app.post('/api/books/create', async (req, res, next) => {
    const response = await create(req.body);
    res.json(response);
    next();
  });
}