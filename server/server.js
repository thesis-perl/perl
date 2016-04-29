var express = require('express');
var app = express();
var port = process.env.PORT || 8000;
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var cors = require('cors');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


// Use body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



// cors
app.use(cors());


// Auth
app.use(cookieParser());
app.use(session({
  secret: 'learn code',
  resave: true,
  saveUninitalized: false
}))

// Serve client files
app.use(express.static(__dirname + '/../client'));

// Routes
app.use('/api/student_signup', require('./routes/studentSignupRoute.js'));
app.use('/api/student_login', require('./routes/studentLoginRoute.js'));


// cors
app.use(cors());

// Routes
app.use('/api/student_signup', require('./routes/studentSignupRoute.js'));
app.use('/api/student_login', require('./routes/studentLoginRoute.js'));


app.post('/api/user_signin', function(req, res) {

   console.log("User signed in", req.body)
   res.send("hiii");

})

app.listen(port, function() {
  console.log('Listening on port ' + port);
})
