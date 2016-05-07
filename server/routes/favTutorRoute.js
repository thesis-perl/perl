var express = require('express');
var router = express.Router();

// load database module
var db = require('../db/db').knex;

router.post('/', function(req, res) {
 var sid = req.body.sid;
 var tid = req.body.tid;
 db('studentutor').where({sid: sid, tid: tid})
 .then(function(data) {
   if (!data[0]) {
     db('studentutor').insert({sid: sid, tid: tid, fav: 1, status: 0})
     .then(function(data){
       res.sendStatus(sid + " favorited " + tid);
     })
   } else {
     db('studentutor').where({sid: sid, tid: tid})
     .update({fav: 1})
     .then(function(data){
       res.sendStatus(sid + " updated " + tid + "to be favorite");
     })
   }
 })
});

// export router
module.exports = router;


