var express = require('express');
var router = express.Router();

// load database module
var db = require('../db/db').knex;

router.post('/', function(req, res) {
  console.log(req.body);
  // student id
  var sid = req.body.sid;
  // tutor id
  var tid = req.body.tid;

  db('studentutor').insert({sid: sid, tid: tid, status: 1})
  .then(function(data) {
    console.log(data);
    res.send(data);
  })
})

router.delete('/', function(req, res) {
  console.log('req', req.headers);
  var sid = req.headers.sid;
  var tid = req.headers.tid;

  db('studentutor').where({sid: sid, tid: tid}).del()
  .then(function() {
    res.send("deleted");
  })
})

// export router
module.exports = router;
