var express = require('express');
var router = express.Router();

// load database module
var db = require('../db/db').knex;

router.get('/', function(req, res) {
  db('users').where({ isTutor: 1})
  .then(function(data) {
    var temp = [];
    for (var i=0; i<data.length; i++) {
      temp.push({id: data[0].id, fullname: data[0].fullname, username: data[0].username, bio: data[0].bio, location: data[0].location, imgurl: data[0].imgurl, javascript: data[0].javascript, ruby: data[0].ruby, python: data[0].python})
    }
    res.send(temp);
  })
})

// export router
module.exports = router;

router.get('/info', function(req, res) {
  var id = req.headers.id;
  db('users').where({ id: id})
  .then(function(data) {
    res.send({id: data[0].id, fullname: data[0].fullname, username: data[0].username, bio: data[0].bio, location: data[0].location, imgurl: data[0].imgurl, javascript: data[0].javascript, ruby: data[0].ruby, python: data[0].python})
  })
})
