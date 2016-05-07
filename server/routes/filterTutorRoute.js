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
    for(var i = 0; i < data.length; i++) {
      if(data[i].fav == 1 && data[i].sid == req.headers.sid) {
        data[i].fav = 1;
      } else {
        data[i].fav = 0;
      }
    }
    res.send(data);
  })
})

// export router
module.exports = router;

router.get('/info', function(req, res) {
  var id = req.headers.id;
  console.log('id ', id);
  db('users').where({ id: id})
  .then(function(data) {
    console.log('filtertutourroute data',data);
    res.send({id: data[0].id, fullname: data[0].fullname, username: data[0].username, bio: data[0].bio, location: data[0].location, imgurl: data[0].imgurl, javascript: data[0].javascript, ruby: data[0].ruby, python: data[0].python})
  })
})
