var express = require('express');
var router = express.Router();

// load database module
var db = require('../db/db').knex;

router.get('/invited', function(req, res) {
  var id = req.headers.id;
  var temp = [];

  db('studentutor').where({ sid: id }).andWhere({ status: 1 })
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

// router.get('/rejected', function(req, res) {
//   var id = req.headers.id;
//   var temp = [];
//   db('studentutor').where({ sid: id }).andWhere({ status: 3 })
//   .then(function(data) {
//     if (data[0]) {
//       for (var i=0; i<data.length; i++) {
//         db('users').where({ id: data[i].tid })
//         .then(function(data){
//           temp.push({id: data[0].id, username: data[0].username, fullname: data[0].fullname, bio: data[0].bio, location: data[0].location, imgurl: data[0].imgurl, isTutor: data[0].isTutor, isStudent: data[0].isStudent, javascript: data[0].javascript, ruby: data[0].ruby, python: data[0].python});
//         })
//         .then(function(){
//           if (temp.length === data.length) {
//             res.send(temp);
//           };
//         })
//       }
//     } else {
//       res.send(null);
//     }
//   })
// })

// export router
module.exports = router;
