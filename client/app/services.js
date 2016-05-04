angular.module('Perl.services', [])
.factory('authFactory', function($http){
  //user signup request

  var postSignupUser = function(userInfo) {
    return $http.post('/api/signup', userInfo);
  };


 //user sigin request
  var postSigninUser = function (userInfo) {

    return $http.post('/api/signin', userInfo);

  };


  // var uploadFileToUrl = function(file, uploadUrl){
  //    var fd = new FormData();
  //    fd.append('file', file);

  //    $http.post(uploadUrl, fd, {
  //       transformRequest: angular.identity,
  //       headers: {'Content-Type': undefined}
  //    })

  //    .success(function(){
  //    })

  //    .error(function(){
  //    });
  // }


  return {
    signin: postSigninUser,
    signup: postSignupUser
    // uploadFileToUrl: uploadFileToUrl
  };


})

.factory('studentFactory', function($http) {
	var getInvitedTutors = function(id) {
    return $http.get('/api/student_dashboard/invited', { headers: { 'id': id } });
	};

  var getAcceptedTutors = function(id) {
    return $http.get('/api/student_dashboard/accepted', { headers: { 'id': id } });
  }

  var getInfo = function (tutorInfo) {
    return $http.get('/api/filter_tutor/info',{ headers: { 'id': tutorInfo.tutorId }});
  };

  var cancelInvitation = function (sid, tid) {
    return $http.delete('/api/reject_invite', { headers: { 'sid': sid, 'tid': tid }});
  }


  var cancelSession = function (sid, tid) {
    return $http.put('/api/cancel_session', { 'sid': sid, 'tid': tid })
  }


	return {
		getInvitedTutors: getInvitedTutors,
    getAcceptedTutors: getAcceptedTutors,
    getTutorInfo: getInfo,
    cancelInvitation: cancelInvitation,
    cancelSession: cancelSession
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

  var acceptInvitation = function(tutorId, sudentId) {
    var ids = {
      tid: tutorId,
      sid: sudentId
    };
    $http.put('api/accept_student', ids)
    
  };

  var rejectInvitation = function(tutorId, sudentId) {
     var ids = {
     tid: tutorId,
     sid: sudentId
    };
    console.log('in reject service', ids)
    $http.delete('api/reject_invite', ids);

  };

  var cancelSession = function(tutorId, sudentId) {
    var ids = {
      tid: tutorId,
      sid: sudentId
    };
    $http.put('api/cancel_session', ids)
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
