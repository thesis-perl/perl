var express = require('express');
var app = express();
var port = process.env.PORT || 8000;
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var db = require('./db/db').knex;
var bcrypt = require('bcrypt');
var FirebaseTokenGenerator = require('firebase-token-generator');

var key = require('./key');

var tokenGenerator = new FirebaseTokenGenerator(key.fireSecret);

// Use body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// cors
app.use(cors());

// Serve client files
app.use(express.static(__dirname + '/../client'));

// Routes
// app.use('/api/signup', require('./routes/signupRoute.js'));
// app.use('/api/login', require('./routes/loginRoute.js'));

app.post('/api/login', function(req, res) {
  var user = req.body;
  return new Promise(function(resolve) {
    if (resolve) {
      db('users').where('username', user.username)
      .then(function(data) {
        bcrypt.compare(user.password, data[0].password, function(err, result) {
          console.log(user.password);
          console.log(data[0].password);
          if (err) {
            res.sendStatus(401);
          } else {
            console.log(data)
            var stringUID = user.username;
            var token = tokenGenerator.createToken({ uid: stringUID, some: "arbitrary", data: "here"});
            res.send({token: token});
          }
        })
        resolve(data);
      })
    }
  })
})

var saltRounds = 10;

app.post('/api/signup', function(req, res) {
  console.log(req.body);
  var userPWbeforeEncrypt = req.body.password;
  var user = req.body.username;
  var hashedPW;
  var userNameTaken = false;

  return new Promise(function(resolve) {
    if(resolve) {
      db('users').where({username: user})
      .then(function(data) {
        if(data.length === 0) {
          console.log("I have a user named: ", data);
          bcrypt.hash(userPWbeforeEncrypt, saltRounds, function(err, hash) {
            if(err) {
              console.log(err);
            } else {
              db('users').insert({username: user, password: hash, location: req.body.location, bio: req.body.bio})
              console.log("this is my req", req.body);
            }
          })
        }
        resolve(data);
      })
    }
  })
})

// cors
app.use(cors());


app.listen(port, function() {
  console.log('Listening on port ' + port);
})
