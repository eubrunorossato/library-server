require('dotenv').config();
const app = require('./config/express');
const https = require('https');
const fs = require('fs');

https.createServer({
  key: fs.readFileSync('./certs/server.key'),
  cert: fs.readFileSync('./certs/server.cert'),
}, app).listen(process.env.PORT, () => {
  console.log(`Server Started on port ${process.env.PORT}`);
})