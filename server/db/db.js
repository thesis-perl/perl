var dbconfig = require('./dbconfig');
var knex = require('knex') ({
  client: 'mysql',
  connection: {
    host: dbconfig.host,
    user: dbconfig.user,
    password: dbconfig.password,
    database: dbconfig.database
  },
  pool: {
    min: 0,
    max: 7
  }
});

knex.schema.createTableIfNotExists('users', function (user) {
  user.increments('id').primary();
  user.string('username').unique();
  user.string('password').unique();
  user.string('bio');
  user.string('location');
  user.integer('online');
  user.boolean('isTutor');
}).then(function() {
  console.log('tutor table created');
});

knex.schema.createTableIfNotExists('languages', function (lang) {
  lang.integer('UserId').unsigned();
  lang.integer('javascript');
  lang.integer('ruby');
  lang.integer('python');
  lang.foreign('UserId').references('id').inTable('users');
}).then(function() {
  console.log('language student table created');
});

knex.schema.createTableIfNotExists('invited', function(join) {
 join.integer('UID1').unsigned();
 join.integer('UID2').unsigned();
 join.foreign('UID1').references('id').inTable('users');
 join.foreign('UID2').references('id').inTable('users');
}).then(function() {
 console.log('invited join table created');
});

knex.schema.createTableIfNotExists('accepted', function(join) {
 join.integer('UID1').unsigned();
 join.integer('UID2').unsigned();
 join.foreign('UID1').references('id').inTable('users');
 join.foreign('UID2').references('id').inTable('users');
}).then(function() {
 console.log('accepted join table created');
});

module.exports = {
  knex: knex
};
