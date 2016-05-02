var express = require('express');
var router = express.Router();

// load database module
var db = require('../db/db').knex;

router.post('/', function(req, res) {
  console.log(req.body);
  // student id
  var uid1 = req.body.uid1;
  // tutor id
  var uid2 = req.body.uid2;

  db('studentutor').insert({UID1: uid1, UID2: uid2, status: 1})
  .then(function(data) {
    console.log(data);
    res.send(data);
  })
})

// export router
module.exports = router;
