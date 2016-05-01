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
  return new Promise(function(resolve) {
    if (resolve) {
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
              res.send({token: token, id: data[0].id});
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
});

// export router
module.exports = router;
