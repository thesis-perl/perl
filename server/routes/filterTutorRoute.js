var express = require('express');
var router = express.Router();

// load database module
var db = require('../db/db').knex;

router.get('/', function(req, res) {
  return new Promise (function(resolve) {
    if (resolve) {
      db('users').where({ isTutor: 1})
      .then(function(data) {
        res.send(data);
      })
    }
  })
})

// export router
module.exports = router;
