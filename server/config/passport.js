// var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;

// // // load database module
// var knex = require('../db/db').knex;

// module.exports = function(passport) {
//   passport.serializeUser(function(user, done) {
//     done(null, user.id);
//   })

//   passport.deserializeUser(function(id, done) {
//     knex('tutors', 'students').select('username')
//   })
// }
