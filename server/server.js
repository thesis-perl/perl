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



app.post('/api/tutor_signup', function(req, res) {

   console.log("signupTutor", req.body)
   res.send("hiii");

})

app.post('/api/student_signup', function(req, res) {

   console.log("signupStudent", req.body)
   res.send("hiii");

})


app.listen(port, function() {
  console.log('Listening on port ' + port);
})
