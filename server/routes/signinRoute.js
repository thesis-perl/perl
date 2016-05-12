var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var FirebaseTokenGenerator = require('firebase-token-generator');
var key = require('../key');
var tokenGenerator = new FirebaseTokenGenerator(key.fireSecret);

// load database module
var db = require('../db/db').knex;

router.post('/', function(req, res) {
  var user = req.body;

  db('users').where('username', user.username)
  .then(function(data) {
    console.log('user password', user.password);
    console.log('data password', data[0].password);
    bcrypt.compare(user.password, data[0].password, function(err, result) {
      if (err) {
        console.log('in err', err);
        res.send(401);
      } else {
        if(result) {
          console.log(data[0]);
          console.log(user);
          var stringUID = user.username;
          var token = tokenGenerator.createToken({ uid: stringUID });
          res.send({token: token, id: data[0].id, username: data[0].username, fullname: data[0].fullname, bio: data[0].bio, location: data[0].location, imgurl: data[0].imgurl, isTutor: data[0].isTutor, isStudent: data[0].isStudent, javascript: data[0].javascript, ruby: data[0].ruby, python: data[0].python});
        } else {
          res.send("password don't match");
        }
      }
    })
  }).then(function(data) {
    console.log(data);
  })
});

// export router
module.exports = router;
