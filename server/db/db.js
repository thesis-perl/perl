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
  user.integer('istutor');
  user.integer('isstudent');
  user.integer('javascript');
  user.integer('ruby');
  user.integer('python');
}).then(function() {
  console.log('tutor table created');
});

knex.schema.createTableIfNotExists('studentutor', function(join) {
  join.increments('ID').primary();
  join.integer('UID1').unsigned();
  join.integer('UID2').unsigned();
  join.integer('status');
  join.foreign('UID1').references('id').inTable('users');
  join.foreign('UID2').references('id').inTable('users');
}).then(function() {
 console.log('invited join table created');
});

module.exports = {
  knex: knex
};
