angular.module('Perl.services', ['btford.socket-io'])
.factory('authFactory', function($http){
  //user signup request

  var postSignupUser = function(userInfo) {
    return $http.post('/api/signup', userInfo);
  };


 //user sigin request
  var postSigninUser = function (userInfo) {

    return $http.post('/api/signin', userInfo);

  };

  return {
    signin: postSigninUser,
    signup: postSignupUser
  };


})


.factory('studentFactory', function($http) {

  var inviteTutor = function (sid, tid) {
    return $http.post('/api/invite_tutor', { 'sid': sid, 'tid': tid })
  }

	var getInvitedTutors = function(id) {
    return $http.get('/api/student_dashboard/invited', { headers: { 'id': id } });
	};

  var getAcceptedTutors = function(id) {
    return $http.get('/api/student_dashboard/accepted', { headers: { 'id': id } });
  }

  var getTutorInfo = function (tutorInfo) {
    console.log('inside getInfo',tutorInfo);
    return $http.get('/api/filter_tutor/info',{ headers: { 'id': tutorInfo.tutorId }});
  };

  var cancelInvitation = function (sid, tid) {
    return $http.delete('/api/reject_invite', { headers: { 'sid': sid, 'tid': tid }});
  }

  var cancelSession = function (sid, tid) {
    return $http.put('/api/cancel_session', { 'sid': sid, 'tid': tid })
  }

  var postInvite = function (sid, tid) {
    console.log(sid,tid);
    return $http.post('/api/invite_tutor', { 'sid': sid, 'tid': tid });
  }

	return {
    getTutorId: getTutorId,
		getInvitedTutors: getInvitedTutors,
    getAcceptedTutors: getAcceptedTutors,
    getTutorInfo: getTutorInfo,
    cancelInvitation: cancelInvitation,
    cancelSession: cancelSession,
    postInvite: postInvite
	}

})
.factory('tutorFactory', function($http){
  //zoe put it here to search all tutors
  var getAllTutors = function() {
    return $http.get('/api/filter_tutor');
  }


  var findTutorsByLanguage = function(language) {
    //make a http call
  }


  var getScheduledSessions = function(id) {
   return $http.get('api/tutor_dashboard/accepted',  { headers: {'id': id }});
  };


  var getInvitations = function(id) {
    return $http.get('api/tutor_dashboard/invited', { headers: {'id': id }});

  };

  var acceptInvitation = function(tutorId, studentId) {
    var ids = {
      tid: tutorId,
      sid: studentId
    };
    $http.put('api/accept_student', ids)

  };

  var rejectInvitation = function(tutorId, studentId) {
    $http.delete('api/reject_invite',  {headers: { 'tid': tutorId, 'sid': studentId }});
  };

  var cancelSession = function(tutorId, studentId) {
    $http.put('/api/cancel_session', {'tid': tutorId, 'sid': studentId});
  };

  return {
     getAllTutors: getAllTutors,
     scheduledSessions: getScheduledSessions,
     invitations: getInvitations,
     acceptInvite: acceptInvitation,
     reject: rejectInvitation,
     cancelSession: cancelSession,
     findTutorsByLanguage: findTutorsByLanguage
  }
})

.factory('perlSocket', function(socketFactory) {
  var socket = socketFactory();
  socket.forward('broadcast');
  return socket;
});
