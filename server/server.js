var express = require('express');
var app = express();
var port = process.env.PORT || 8000;
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var db = require('./db/db').knex;
var bcrypt = require('bcrypt');
var nodecrypt = require('bcrypt-nodejs');
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
        console.log('user password', user.password);
        console.log('data password', data[0].password);
        nodecrypt.compare(user.password, data[0].password, function(err, result) {
          if (err) {
            console.log('in err', err);
            res.send(401);
          } else {
            if(result) {
              console.log(data[0])
              console.log(user)
              var stringUID = user.username;
              var token = tokenGenerator.createToken({ uid: stringUID });
              res.send({token: token});
            } else {
              res.send("password don't match");
            }
          }
        })
      }).then(function(data) {
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
