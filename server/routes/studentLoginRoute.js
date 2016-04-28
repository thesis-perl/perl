var express = require('express');
var router = express.Router();
var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');

// load database module
var knex = require('../db/db').knex;

router.get('/', function(req, res) {
  var user = req.body;
  if(req.isAuthenticated()) {
    res.redirect('/')
  }
})

router.post('/', function(req, res) {
  passport.authenticate('local', {successRedirect: '/', failureRedirect: '/student_login'})
})

// export router
module.exports = router;
