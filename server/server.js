var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 8000;
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var db = require('./db/db').knex;
var bcrypt = require('bcrypt');
var nodecrypt = require('bcrypt-nodejs');
var FirebaseTokenGenerator = require('firebase-token-generator');
var key = require('./key');
var tokenGenerator = new FirebaseTokenGenerator(key.fireSecret);



// set up our socket server
require('./socket/socket')(io);

// Use body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// cors
app.use(cors());

// Serve client files
app.use(express.static(__dirname + '/../client'));

// API Routing
app.use('/api/signin', require('./routes/signinRoute.js'));
app.use('/api/signup', require('./routes/signupRoute.js'));
app.use('/api/invite_tutor', require('./routes/inviteTutorRoute.js'));
app.use('/api/fav_tutor', require('./routes/favTutorRoute.js'));
app.use('/api/unfavorite', require('./routes/unfavRoute.js'));
app.use('/api/accept_student', require('./routes/acceptStudentRoute.js'));
app.use('/api/reject_invite', require('./routes/inviteTutorRoute.js'));
app.use('/api/cancel_session', require('./routes/rejectInviteRoute.js'));
app.use('/api/student_dashboard', require('./routes/studentDashboardRoute.js'));
app.use('/api/tutor_dashboard', require('./routes/tutorDashboardRoute.js'));
app.use('/api/filter_tutor', require('./routes/filterTutorRoute.js'));
app.use('/api/cancel_history', require('./routes/cancelSessionRoute.js'));
app.use('/api/end_seesion', require('./routes/endSessionRoute.js'));

// cors
app.use(cors());


http.listen(port, function() {
  console.log('Listening on port ' + port);
});
