var express = require('express');
var router = express.Router();

// load database module
var db = require('../db/db').knex;

router.get('/', function(req, res) {
  var tid = req.headers.tid;
  db('reviews').where({tid: tid})
  .rightJoin('users', 'reviews.sid', 'users.id')
  .then(function(data) {
    res.send(data);
  })
})

router.post('/', function(req, res) {
  var sid = req.body.sid;
  var tid = req.body.tid;
  var review = req.body.review;

  db('reviews').insert({sid: sid, tid: tid, review: review})
  .then(function(data) {
    res.status(201).send(data);
  })
})

// export router
module.exports = router;
