require('dotenv').config();
const app = require('./src/config/express');
const https = require('https');
const fs = require('fs');

https.createServer({
    key: fs.readFileSync('./certs/server.key'),
    cert: fs.readFileSync('./certs/server.cert'),
  }, app).listen(process.env.PORT, async () => {
    console.log(`Server Started on port ${process.env.PORT}`);
});