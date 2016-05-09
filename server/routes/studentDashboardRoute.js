var express = require('express');
var router = express.Router();

// load database module
var db = require('../db/db').knex;

router.get('/invited', function(req, res) {
  var id = req.headers.id;
  var temp = [];

  db('studentutor').where({ sid: id }).whereNot({ status: 0 })
  .leftJoin('users', 'users.id', 'studentutor.tid')
  .then(function(data){
    for(var i = 0; i < data.length; i++) {
      if(data[i].fav == 1 && data[i].sid == id) {
        data[i].fav = 1;
      } else {
        data[i].fav = 0;
      }
    }
    res.send(data);
  })
})

router.get('/accepted', function(req, res) {
  var id = req.headers.id;
  var temp = [];
  db('studentutor').where({ sid: id }).andWhere({ status: 2 })
  .leftJoin('users', 'users.id', 'studentutor.tid')
  .then(function(data){
    console.log('before',data)
    for(var i = 0; i < data.length; i++) {
      if(data[i].fav == 1 && data[i].sid == id) {
        data[i].fav = 1;
      } else {
        data[i].fav = 0;
      }
    }
        console.log('after',data)

    res.send(data);
  })
})

router.get('/cancelled', function(req, res) {
  var id = req.headers.id;
  var temp = [];

  db('studentutor').where({ sid: id }).andWhere({ status: 3 })
  .leftJoin('users', 'users.id', 'studentutor.tid')
  .then(function(data){
    for(var i = 0; i < data.length; i++) {
      if(data[i].fav == 1 && data[i].sid == id) {
        data[i].fav = 1;
      } else {
        data[i].fav = 0;
      }
    }
    res.send(data);
  })
})

router.get('/finished', function(req, res) {
  var id = req.headers.id;
  var temp = [];

  db('studentutor').where({ sid: id }).andWhere({ status: 4 })
  .leftJoin('users', 'users.id', 'studentutor.tid')
  .then(function(data){
    for(var i = 0; i < data.length; i++) {
      if(data[i].fav == 1 && data[i].sid == id) {
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
