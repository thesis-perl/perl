var express = require('express');
var router = express.Router();

// // load database module

var knex = require('../db/db').knex;

router.get('/', function (req, res) {
  if(req.isAuthenticated()) {
    res.redirect('/');
  } else {
    res.redirect('/student_login');
  }
})

router.post('/', function (req, res) {
  var user = req.body;
  console.log(user);
  var usernamePromise = null;
  usernamePromise = knex('students').select('username');
  return usernamePromise.then(function(result) {
    console.log(result);
    if(result) {
      res.render('signup');
    }
  })

})

// export router
module.exports = router;
