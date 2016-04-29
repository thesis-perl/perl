var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt-nodejs');

// load database module

var knex = require('../db/db').knex;


router.get('/', function(req, res) {
  var user = req.body.username;
  knex('users').where({username: user.username})
    .then(function(resp) {
      console.log(resp);
    })
})

router.post('/', function(req, res) {

})

// export router
module.exports = router;
