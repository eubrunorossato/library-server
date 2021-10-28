const books = require('./services/books');
const genre = require('./services/genre');
const auhtor = require('./services/author');
const user = require('./services/user');
const request = require('./services/requests');
const sms = require('./services/twilio/index');
const { ensureAuth } = require('./services/auth/index');

module.exports = (app) => {
  app.use('/api/', (req, res, next) => {
    ensureAuth(req, res, next);
  });

  app.get('/check/register/:email', async (req, res, next) => {
    const { code, userRegister } = await user.getUserByEmail(req.params.email);
    if (user === null) {
      res.status(code).json(userRegister);
    } else {
      res.status(code).json({ userRegister: true });
    }
  });

  app.post('/api/sms/send', async (req, res, next) => {
    const { code, isSent } = await sms(req.body);
    res.status(code).json(isSent)
  });

  app.get('/api/user/getUserByEmail/:email', async (req, res, next) => {
    console.log(req.params);
    const userLogged = await user.getUserByEmail(req.params.email);
    res.json(userLogged);
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

  app.post('/api/request/create', async (req, res, next) => {
    const { code, data } = await request.create(req);
    res.status(code).json(data);
    next();
  });
}