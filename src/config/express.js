const express = require('express');
const postgres = require('../database/index');
const routes = require('../routes');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
routes(app);
postgres();

module.exports = app;