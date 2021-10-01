const books = require('./services/books');
const genre = require('./services/genre');
const auhtor = require('./services/author');
const user = require('./services/user');
const {createAuthToken} = require('./services/auth/index')

module.exports = (app) => {
  app.post('/login', async (req, res, next) => {
    const { body } = req;
    const accessToken = createAuthToken(body);
    const userLogin = await user.getUserByEmail(body);
    res.json({accessToken, user: userLogin.user});
  });

  app.post('/api/user/create', async (req, res, next) => {
    const { body } = req;
    const { code, message } = await user.create(body);
    res.status(code).json(message)
  });

  app.post('/api/author/create', async (req, res, next) => {
    const { code, message } = await auhtor.create(req.body);
    res.status(code).json(message);
    next();
  });
  app.get('/api/author/getAll', async (req, res, next) => {
    const response = await auhtor.getAll();
    res.json(response);
    next();
  });

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