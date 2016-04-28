var express = require('express');
var router = express.Router();

// // load database module
var knex = require('../db/db.js');

router.post('/', function(req, res) {
  var user = req.body;
  console.log(user);
})

// export router
module.exports = router;
