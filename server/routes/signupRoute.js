var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var FirebaseTokenGenerator = require('firebase-token-generator');
var key = require('../key');
var tokenGenerator = new FirebaseTokenGenerator(key.fireSecret);

// // load database module
var db = require('../db/db').knex;
var saltRounds = 10;
var notSignedUp = false;


router.post('/', function(req, res) {
  var userPWbeforeEncrypt = req.body.password;
  var user = req.body.username;
  var hashedPW;
  var userNameTaken = false;

  db('users').where({username: user})
  .then(function(data) {
    if(data.length === 0) {
      bcrypt.hash(userPWbeforeEncrypt, saltRounds, function(err, hash) {
        db('users').insert({username: user, password: hash, isTutor: req.body.tutor, isStudent: req.body.student, location: req.body.location, bio: req.body.bio, javascript: req.body.javascript, ruby: req.body.ruby, python: req.body.python})
        .then(function(data) {
          db('users').where('username', user)
          .then(function(data) {
            var stringUID = data[0].id.toString();
            var token = tokenGenerator.createToken({uid: stringUID});
            res.send({token: token, id: data[0].id, username: data[0].username, bio: data[0].bio, location: data[0].location, imgurl: data[0].imgurl, isTutor: data[0].isTutor, isStudent: data[0].isStudent, javascript: data[0].javascript, ruby: data[0].ruby, python: data[0].python});
          })
        })
      })
    } else {
      console.log("This username is taken!");
      res.send(userNameTaken);
    }
  })
});

// export router
module.exports = router;
