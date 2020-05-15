var express = require('express');
var app = express();
var path = require('path');
var cors = require('cors');
// var whitelist = 'http://13.126.56.239:3000,https://www.google.com';

// let allowCrossDomain = function(req, res, next) {
//   var allowedOrigins = whitelist.split(',');
//   let origin = req.headers.origin;
//   console.log("Allowed: ",allowedOrigins);
//   console.log("Origin: ", origin);
//   if (allowedOrigins.indexOf(origin) > -1) {
//     res.setHeader('Access-Control-Allow-Origin', origin);
//   }
//   res.header('Access-Control-Allow-Credentials', true);
//   res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
//   next();
// }

// app.use(allowCrossDomain);
app.use(cors());

// viewed at http://localhost:8080
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/local', function (req, res) {
  res.send(JSON.stringify({ message: 'This is local' }));
});


app.listen(8080);