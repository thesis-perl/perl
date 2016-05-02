var express = require('express');
var router = express.Router();

// load database module
var db = require('../db/db').knex;

router.put('/', function(req, res) {
  var uid1 = req.body.uid1;
  var uid2 = req.body.uid2;

  db('studentutor').where({UID1: uid1, UID2: uid2})
  .update({
    status: 2
  })
  .then(function(data){
    res.send(data);
  })
})

// export router
module.exports = router;
