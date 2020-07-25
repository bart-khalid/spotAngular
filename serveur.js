const express = require('express');
const path = require('path');
const app = express();
app.enable('trust proxy');
app.use(express.static(__dirname + '/dist/spot'));
app.use(function (req, res , next) {
  if(req.secure) {
    next();
  } else {
    res.redirect(301, 'https://' + req.headers.host + req.url);
  }
});
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/spot/index.html'));
});
app.listen(process.env.PORT || 24942);
console.log('im running');

