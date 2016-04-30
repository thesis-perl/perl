var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var nodecrypt = require('bcrypt-nodejs');
var FirebaseTokenGenerator = require('firebase-token-generator');
var key = require('../key');
var tokenGenerator = new FirebaseTokenGenerator(key.fireSecret);

// // load database module

var db = require('../db/db').knex;
var saltRounds = 10;
var notSignedUp = false;

// router.post('/', function(req, res) {

// });

router.post('/', function(req, res) {
  console.log(req.body);
  var userPWbeforeEncrypt = req.body.password;
  var user = req.body.username;
  var hashedPW;
  var userNameTaken = false;

  return new Promise (function(resolve) {
    if(resolve) {
      db('users').where({username: user})
      .then(function(data) {
        if(data.length === 0) {
          console.log("I don't have a user with the username:", user);
          bcrypt.hash(userPWbeforeEncrypt, saltRounds, function(err, hash) {
            db('users').insert({username: user, password: hash, isTutor: req.body.tutor, isStudent: req.body.student, location: req.body.location, bio: req.body.bio, javascript: req.body.javascript, ruby: req.body.ruby, python: req.body.python})
            .then(function(data) {
              console.log("this is my data", data);
              var stringUID = data[0].toString();
              var token = tokenGenerator.createToken({ uid: stringUID});
              res.send({token: token});
              console.log(token);
            })
          })
        } else {
          console.log("This username is taken!");
          res.send(userNameTaken);
        }
      })
    }
  })
});

// export router
module.exports = router;
