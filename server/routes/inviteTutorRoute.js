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
  var time = req.body.time;
  var date = req.body.date;
  console.log('sid',sid);
  console.log('tid',tid);
  db('studentutor').where({sid: sid, tid: tid})
  .then(function(data) {
    if(!data[0]) {
      db('studentutor').insert({sid: sid, tid: tid, time: time, date: date, fav: 0, status: 1})
      .then(function(data) {
        db('studentutor').where({id: data[0]})
        .then(function(data) {
          console.log(data);
          res.send(data);
        })
      })
    } else {
      console.log('already invited', data[0].status, typeof data[0].status);
      if(data[0].status !== 1 && data[0].status !== 2) {
        db('studentutor').where({sid: sid, tid: tid}).update({status: 1, time: time, date: date})
        .then(function(data) {
          console.log('updated', data);
          res.send(data);
        })
      } else {
        res.send('already invited or accepted');
      }
    }
  })
})

router.put('/', function(req, res) {
  var sid = req.body.sid;
  var tid = req.body.tid;
  db('studentutor').where({sid: sid, tid: tid})
  .update({
    status: 5
  })
  .then(function(data){
  res.sendStatus(data);
  })
})

// export router
module.exports = router;
