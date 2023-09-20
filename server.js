const express = require('express');
const https = require('https');
const http = require('http');
const fs = require('fs');

const app = express();
const httpsPort = 443;
const httpPort = 80;

const privateKey = fs.readFileSync('/etc/letsencrypt/live/docs.mineserv.top/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/docs.mineserv.top/fullchain.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };

app.use((req, res, next) => {
  if (req.secure) {
    return next();
  }
  res.redirect(`https://${req.headers.host}${req.url}`);
});

app.use(express.static('public'));

const httpServer = http.createServer((req, res) => {
  res.writeHead(301, { 'Location': `https://${req.headers.host}${req.url}` });
  res.end();
});

const httpsServer = https.createServer(credentials, app);

httpServer.listen(httpPort, () => {
  console.log(`HTTP сервер слушает на порту ${httpPort}`);
});

httpsServer.listen(httpsPort, () => {
  console.log(`HTTPS сервер слушает на порту ${httpsPort}`);
});
