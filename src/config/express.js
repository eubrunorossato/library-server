const express = require('express');
const { createConnection } = require('../database/index');
const routes = require('../routes');
const fileUpload = require('express-fileupload');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(fileUpload())
routes(app);
createConnection();

module.exports = app;