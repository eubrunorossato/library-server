const express = require('express');
const session = require('express-session');
const { createConnection } = require('../database/index');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const routes = require('../routes');

const app = express();
const sessionSecret = process.env.TOKEN_KEY;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(fileUpload());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200
}));
app.use(session({
  resave: 'true',
  saveUninitialized: 'true',
  secret: sessionSecret,
  cookie: {
      maxAge: 8 * 60 * 60 * 1000
  }
}));
routes(app);
createConnection();

module.exports = app;