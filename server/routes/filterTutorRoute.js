var express = require('express');
var router = express.Router();

// load database module
var db = require('../db/db').knex;

router.get('/', function(req, res) {
  console.log('sid', req.headers.sid)
  db.select('*').from('users').where('isTutor', 1).leftOuterJoin('studentutor', function(){
    this.on('users.id', "=", 'studentutor.tid')
  })
  .then(function(data){
    var result = [];
    for(var i = 0; i < data.length; i++) {
      if(data[i].tid === null) {
        result.push(data[i]);
      } else {
        var repeat = 0;
        for(var j = 0; j < result.length; j++) {
          if(data[i].tid === result[j].tid) {
            repeat = 1;
          }
        }
        if(repeat === 0) {
          result.push(data[i]);
        }
      }
    }

    for(var k = 0; k < data.length; k++) {
      if(data[k].sid == req.headers.sid) {
        for(var q = 0; q < result.length; q++) {
          if(result[q].tid === data[k].tid) {
            result[q].fav = data[k].fav;
          }
        }
      }
    }

    for(var i = 0; i < result.length; i++) {
      result[i].fav = result[i].fav || 0;
    }

    res.send(result);
  })
})

// export router
module.exports = router;

router.get('/info', function(req, res) {
  console.log(req.headers)
  var tid = req.headers.tid;
  var sid = req.headers.sid;
  console.log('tid ', tid);
  console.log('sid ', sid);
  db('studentutor').where({sid: sid, tid: tid})
  .rightOuterJoin('users', 'users.id', 'studentutor.tid')

  .then(function(data) {
    if (!data[0]) {
      db('users').where({id: tid})
      .then(function(data) {
        console.log('new filtertutourroute data',data);
        res.send({id: data[0].id, fullname: data[0].fullname, username: data[0].username, bio: data[0].bio, location: data[0].location, imgurl: data[0].imgurl, javascript: data[0].javascript, ruby: data[0].ruby, python: data[0].python})
      })
    } else {
      console.log('existing filtertutourroute data',data);
      res.send({id: data[0].id, fullname: data[0].fullname, username: data[0].username, bio: data[0].bio, location: data[0].location, imgurl: data[0].imgurl, javascript: data[0].javascript, ruby: data[0].ruby, python: data[0].python, status: data[0].status})
    }
  })
})

