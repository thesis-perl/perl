var express = require('express');
var router = express.Router();

// load database module
var knex = require('../db/db.js');

router.get('/', function(req, res) {
  var user = req.body;
  console.log('inside login get', user);
})

// export router
module.exports = router;
