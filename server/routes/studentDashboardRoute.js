var express = require('express');
var router = express.Router();

// load database module
var db = require('../db/db').knex;

router.post('/', function(req, res) {
  var user = req.body.username;
  return new Promise (function(resolve) {
    if (resolve) {
      var info = [];
      db('users').where({ username: user })
      .then(function(data) {
        info.push(data[0]);
      })
      .then(function(data) {
        console.log(info);
        db('studentutor').where({ UID1: data.id })
        .then(function(data) {
          res.send(data);
        })
      })
    }
  })
})

// export router
module.exports = router;
