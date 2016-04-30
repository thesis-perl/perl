var express = require('express');
var router = express.Router();

// load database module
var db = require('../db/db').knex;

// router.post('/', function(req, res) {
//   console.log(req.body);
//   var uid1 = req.body.uid1;
//   var uid2 = req.body.uid2;
//   return new Promise (function(resolve) {
//     if (resolve) {
//       db('studentutor').insert({UID1: uid1, UID2: uid2, status: 1})
//       .then(function(data) {
//         console.log(data);
//         res.send(data);
//       })
//     }
//   })
// })

router.get('/', function(req, res) {
  return new Promise (function(resolve) {
    if (resolve) {
      db('users').where({ isTutor: 1})
      .then(function(data) {
        res.send(data);
      })
    }
  })
})

// export router
module.exports = router;
