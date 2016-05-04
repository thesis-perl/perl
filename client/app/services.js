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

  var getScheduledSessions = function() {
   //return $http.get('api/tutor_dashboard/accepted');

    //testing with dummy data
     var obj = {
       sessions: [{id: 2, student: 'Ani Steffanie', date: '06-13-2016', time: '8pm-9pm', bio: 'I am journalist aiming to learn programming', location: 'North Hollywood', subjects: ['javascript', 'Angular']},
                  {id: 1, student: 'Celine Dion', date: '09-23-2016', time: '6pm-8pm', bio: 'I left my signing career and want to be an engineer', location: 'Las Vegas',  subjects: ['javascript', 'Angular']}
                  ]
      };

    return obj;
  };

  var getInvitations = function() {
    //return $http.get('api/tutor_dashboard/invited');
    //testing with dummy data
    var obj = {
      invitations: [{id: 3, student: 'Tom Hanks', date: '08-02-2016', time: '8pm-9pm', bio: 'No one wants to give me roles in movies, so I want to become a programmer', location: 'Hollywood', subjects: ['javascript', 'Angular']},
                      {id: 4, student: 'Pamela Anderson', date: '09-23-2016', time: '10pm-11pm', bio: 'I wanna code with you. It will be fun', location: 'Beverly Hills',  subjects: ['javascript', 'Angular']}
                    ]
    };

    return obj;
  };

  var acceptInvitation = function(tutorId, sudentId) {
    var ids = {
      tid: tutorId,
      sid: sudentId
    };
    $http.put('api/accept_student', ids)
  };

  var rejectInvitation = function(tutorId, sudentId) {};

  var cancelSession = function(tutorId, sudentId) {};

 return {
     getAllTutors: getAllTutors,
     scheduledSessions: getScheduledSessions,
     invitations: getInvitations,
     acceptInvite: acceptInvitation,
     reject: rejectInvitation,
     cancelSession: cancelSession
  }


})
