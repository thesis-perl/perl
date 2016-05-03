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
  user.string('imgurl');
  user.integer('online');
  user.integer('isTutor');
  user.integer('isStudent');
  user.integer('javascript');
  user.integer('ruby');
  user.integer('python');
}).then(function() {
  console.log('tutor table created');
});

knex.schema.createTableIfNotExists('studentutor', function(join) {
  join.increments('ID').primary();
  join.integer('sid').unsigned();
  join.integer('tid').unsigned();
  join.integer('status');
  join.foreign('sid').references('id').inTable('users');
  join.foreign('tid').references('id').inTable('users');
}).then(function() {
 console.log('invited join table created');
});

module.exports = {
  knex: knex
};
