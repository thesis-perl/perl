var express = require('express');
var router = express.Router();

// load database module
var db = require('../db/db').knex;

router.put('/', function(req, res) {
  console.log(req.body);
  console.log(req.body);
  var sid = req.body.sid;
  var tid = req.body.tid;

  db('studentutor').where({sid: sid, tid: tid})
  .update({
    status: 3
  })
  .then(function(data){
    res.sendStatus(data);
  })
})

router.get('/', function(req, res) {
  var sid = req.headers.sid;

  db('studentutor').where({sid: sid, status: 3}).leftOuterJoin('users', function() {
    this.on('users.id', "=", 'studentutor.tid')
  })
  .then(function(data) {
    res.send(data);
  })
})

// export router
module.exports = router;

