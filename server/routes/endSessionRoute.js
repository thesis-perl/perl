var express = require('express');
var router = express.Router();

// load database module
var db = require('../db/db').knex;

router.put('/', function(req, res) {
  var sid = req.body.sid;
  var tid = req.body.tid;

  db('studentutor').where({sid: sid, tid: tid})
  .update({
    status: 4
  })
  .then(function(data){
    res.sendStatus(data);
  })
})

// export router
module.exports = router;
