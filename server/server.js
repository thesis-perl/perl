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

// Bcrypting stuffs
var saltRounds = 10;
var notSignedUp = false;

// API Routing
app.use('/api/login', require('./routes/loginRoute.js'));
app.use('/api/signup', require('./routes/signupRoute.js'));


// cors
app.use(cors());

app.listen(port, function() {
  console.log('Listening on port ' + port);
});
