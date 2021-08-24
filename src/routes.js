const { create } = require('./services/books');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })

module.exports = (app) => {
  app.post('/api/books/create', async (req, res, next) => {
    const { data } = req.files.book_picture
    const response = await create(req.body, data);
    res.json(response);
    next();
  });
}