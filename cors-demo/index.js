var express = require('express')
var bodyParser = require('body-parser')
var session = require('express-session')
var path = require('path')
var app = express()

app.use(function(req, res, next) {
  const { rawHeaders, method, url } = req;

  console.log(
    JSON.stringify({
      timestamp: Date.now(),
      rawHeaders,
      method,
      url
    })
  );
  next();
});

var whitelist = 'http://localhost:8080,http://anotherclient.com';

let allowCrossDomain = function(req, res, next) {
  var allowedOrigins = whitelist.split(',');
  let origin = req.headers.origin;
  console.log("Allowed: ",allowedOrigins);
  console.log("Origin: ", origin);
  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }
  next();
}

app.use(allowCrossDomain);

var privateData = 'Secret data'

app.use(bodyParser.json())

app.use(session({
  secret: 'ThisIsNotSafe',
  resave: true,
  saveUninitialized: true
}))

// viewed at http://localhost:3000
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/public', function (req, res) {
  console.log("public api hit");
  res.send(JSON.stringify({
    message: 'This is public'
  }));
})

app.post('/login', function(req, res) {
  console.log("login api hit");
  if(req.body.password === 'secret') {
    req.session.loggedIn = true
    res.send('You are now logged in!')
  } else {
    res.send('Wrong password.')
  }
})

app.get('/private', function(req, res) {
  console.log("private api hit ");
  if(req.session.loggedIn) {
    console.log('Logged in')
    res.send(`The secret is: ${privateData}`)
  } else {
    res.send('Login first')
  }
})

app.listen(process.env.PORT || 3000)