const { create, getAll } = require('./services/books');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })

module.exports = (app) => {
  app.post('/api/books/create', async (req, res, next) => {
    const { data } = req.files.book_picture
    const response = await create(req.body, data);
    res.json(response);
    next();
  });

  app.get('/api/books/getAll', async (req, res, next) => {
    const response = await getAll();
    res.json(response);
    next();
  });
}