const express = require('express');
const { createConnection } = require('../database/index');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const routes = require('../routes');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(fileUpload());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200
}));
routes(app);
createConnection();

module.exports = app;