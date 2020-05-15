var express = require('express')
var bodyParser = require('body-parser')
var session = require('express-session')
var app = express()

var privateData = 'Secret data'

app.use(bodyParser.json())

app.use(session({
  secret: 'ThisIsNotSafe',
  resave: true,
  saveUninitialized: true
}))

app.get('/public', function (req, res) {
  res.send(JSON.stringify({
    message: 'This is public'
  }));
})

app.post('/login', function(req, res) {
  if(req.body.password === 'secret') {
    req.session.loggedIn = true
    res.send('You are now logged in!')
  } else {
    res.send('Wrong password.')
  }
})

app.get('/private', function(req, res) {
  if(req.session.loggedIn) {
    console.log('Logged in')
    res.send(`The secret is: ${privateData}`)
  } else {
    res.send('Login first')
  }
})

app.listen(process.env.PORT || 3000)