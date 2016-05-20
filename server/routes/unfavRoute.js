var express = require('express');
var router = express.Router();

// load database module
var db = require('../db/db').knex;

router.put('/', function(req, res) {
  var sid = req.body.sid;
  var tid = req.body.tid;

  db('studentutor').where({sid: sid, tid: tid}).whereNot({status: 0})
  .update({fav: 0})
  .then(function(data){
    res.sendStatus(sid + " unfavorited " + tid);
  })

  db('studentutor').where({sid: sid, tid: tid, status: 0})
  .del()
  .then(function(data){
    res.sendStatus(sid + " del unfavorited " + tid);
  })
})

// export router
module.exports = router;
