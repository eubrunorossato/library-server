const express = require('express');
const postgres = require('../database/index');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
postgres();

module.exports = app;