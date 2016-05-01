var express = require('express');
var router = express.Router();

// load database module
var db = require('../db/db').knex;

router.get('/', function(req, res) {
  return new Promise (function(resolve) {
    if (resolve) {
      db('users').where({ isTutor: 1})
      .then(function(data) {
        res.send({id: data[0].id, username: data[0].username, bio: data[0].bio, location: data[0].location, imgurl: data[0].imgurl, javascript: data[0].javascript, ruby: data[0].ruby, python: data[0].python});
      })
    }
  })
})

// export router
module.exports = router;
