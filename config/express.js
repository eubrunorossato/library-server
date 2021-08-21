const express = require('express');

const app = express();

app.use(express.bodyParser());

module.exports = app;