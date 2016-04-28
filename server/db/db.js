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

knex.schema.createTableIfNotExists('tutors', function (tutor) {
  tutor.increments('id').primary();
  tutor.string('username').unique();
  tutor.string('password').unique();
  tutor.string('bio');
  tutor.string('location');
  tutor.int('online');
}).then(function() {
  console.log('tutor table created');
});

knex.schema.createTableIfNotExists('students', function (student) {
  student.increments('id').primary();
  student.string('username').unique();
  student.string('password').unique();
  student.string('bio');
  student.string('location');
  student.int('online');
}).then(function() {
  console.log('student table created');
});

knex.schema.createTableIfNotExists('languagestudent', function (langstud) {
  langstud.integer('StudentID').unsigned();
  langstud.int('javascript');
  langstud.int('ruby');
  langstud.int('python');
  langstud.foreign('StudentID').references('id').inTable('students');
}).then(function() {
  console.log('language student table created');
});

knex.schema.createTableIfNotExists('languagetutor', function (langtut) {
  langtut.integer('TutorID').unsigned();
  langtut.int('javascript');
  langtut.int('ruby');
  langtut.int('python');
  langtut.foreign('TutorID').references('id').inTable('tutors');
}).then(function() {
  console.log('language student table created');
});

knex.schema.createTableIfNotExists('invited', function(join) {
 join.integer('TutorID').unsigned();
 join.integer('StudentID').unsigned();
 join.foreign('TutorID').references('id').inTable('tutors');
 join.foreign('StudentID').references('id').inTable('students');
}).then(function() {
 console.log('invited join table created');
});

knex.schema.createTableIfNotExists('accepted', function(join) {
 join.integer('TutorID').unsigned();
 join.integer('StudentID').unsigned();
 join.foreign('TutorID').references('id').inTable('tutors');
 join.foreign('StudentID').references('id').inTable('students');
}).then(function() {
 console.log('accepted join table created');
});

module.exports = {
  knex: knex
};
