var express = require('express');
var router = express.Router();

// load database module
var db = require('../db/db').knex;


// export router
module.exports = router;
