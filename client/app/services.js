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


.factory('studentFactory', function($rootScope, $http) {
  var getTutorId = function(tid) {
    $rootScope.tid = tid;
  }


  var inviteTutor = function (sid, tid) {
    return $http.post('/api/invite_tutor', { 'sid': sid, 'tid': tid })
  }

	var getInvitedTutors = function(id) {
    return $http.get('/api/student_dashboard/invited', { headers: { 'id': id } });
	};

  var getAcceptedTutors = function(id) {
    return $http.get('/api/student_dashboard/accepted', { headers: { 'id': id } });
  }

  var getCancelledTutors = function(id) {
    return $http.get('/api/student_dashboard/cancelled', { headers: { 'id': id } });
  }

  var getFinishedTutors = function(id) {
    return $http.get('/api/student_dashboard/finished', { headers: { 'id': id } });
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
    getCancelledTutors: getCancelledTutors,
    getFinishedTutors: getFinishedTutors,
    getTutorInfo: getTutorInfo,
    cancelInvitation: cancelInvitation,
    cancelSession: cancelSession,
    postInvite: postInvite
	}

})
.factory('tutorFactory', function($http, $rootScope){
  //zoe put it here to search all tutors
  var getStudentId = function(sid) {
    $rootScope.sid = sid;
    console.log("tutorfactory sid:",$rootScope.sid);
  }

  var getAllTutors = function(sid) {
   return $http.get('/api/filter_tutor', { headers: {'sid': sid}})
  }


  var findTutorsByLanguage = function(language) {
    //make a http call
    // return $http.get()
  }

  var getInvitedStudents = function(id) {
    return $http.get('/api/tutor_dashboard/invited', { headers: {'id': id }});

  };

  var getAcceptedStudents = function(id) {
   return $http.get('/api/tutor_dashboard/accepted',  { headers: {'id': id }});
  };

  var getCancelledStudents = function(id) {
    return $http.get('/api/tutor_dashboard/cancelled', { headers: { 'id': id } });
  }

  var getFinishedStudents = function(id) {
    return $http.get('/api/tutor_dashboard/finished', { headers: { 'id': id } });
  }


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

   var startSession = function(code){

      //return $http.get('/startsession', {headers: {'code': code}})

   };

  var cancelSession = function(tutorId, studentId) {
    $http.put('/api/cancel_session', {'tid': tutorId, 'sid': studentId});
  };

  var addFavorite = function(sid, tid) {
    return $http.post('/api/fav_tutor', {'tid': tid, 'sid': sid});
  }

  var deleteFavorite = function(sid, tid) {
    return $http.put('/api/unfavorite', {'tid': tid, 'sid': sid});
  }


  return {
     getStudentId: getStudentId,
     getAllTutors: getAllTutors,
     getInvitedStudents: getInvitedStudents,
     getAcceptedStudents: getAcceptedStudents,
     getCancelledStudents: getCancelledStudents,
     getFinishedStudents: getFinishedStudents,
     acceptInvite: acceptInvitation,
     reject: rejectInvitation,
     cancelSession: cancelSession,
     findTutorsByLanguage: findTutorsByLanguage,
     startSession: startSession,
     addFavorite: addFavorite,
     deleteFavorite: deleteFavorite, 
    }
})

.factory('perlSocket', function(socketFactory) {
  var socket = socketFactory();
  socket.forward('broadcast');
  socket.forward('joined');
  socket.forward('typing');
  socket.forward('untyping');

  return socket;
})
.factory('sessionFactory', function($http) {
    //saving session/lesson code in database
  var saveCodeDB = function(tutorId, studentId, code){
    var sessionInfo = {
      tid: tutorId,
      sid: studentId,
      code: code
    };

    console.log('getting code info', sessionInfo)
    $http.post('save_code', sessionInfo);
  };


  return {
    saveCodeDB: saveCodeDB
  }

})
