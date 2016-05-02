angular.module('Perl.services', [])
.factory('authFactory', function($http){
  //user signup request
  var postSignupUser = function(userInfo) {
    return $http.post('/api/signup', userInfo);
    console.log('signin in a user', userInfo);
  };


 //user sigin request
  var postSigninUser = function (userInfo) {

    return $http.post('/api/signin', userInfo);

  };


  var uploadFileToUrl = function(file, uploadUrl){
     var fd = new FormData();
     fd.append('file', file);

     $http.post(uploadUrl, fd, {
        transformRequest: angular.identity,
        headers: {'Content-Type': undefined}
     })

     .success(function(){
     })

     .error(function(){
     });
  }


  return {
    signin: postSigninUser,
    signup: postSignupUser,
    uploadFileToUrl: uploadFileToUrl
  };


})

.factory('studentFactory', function($http) {
	var getProfile = function(){

	};
	return {
		getProfile: getProfile
	}

})
.factory('tutorFactory', function($http){
  var getScheduledSessions = function() {
    //return $http.get('api/scheduled_sessions');

    //testing with dummy data
    var obj = {
        sessions: [{student: 'Ani Steffanie', date: '06-13-2016', time: '8pm-9pm', bio: 'I am journalist aiming to learn programming', location: 'North Hollywood', subjects: ['javascript', 'Angular']},
                      {student: 'Celine Dion', date: '09-23-2016', time: '6pm-8pm', bio: 'I left my signing career and want to be an engineer', location: 'Las Vegas',  subjects: ['javascript', 'Angular']}
                      ]
    };

    return obj;
  };

  var getInvitations = function() {
    //return $http.get('api/invitations');

    //testing with dummy data
      var obj = {
       invitations: [{student: 'Tom Hanks', date: '08-02-2016', time: '8pm-9pm', bio: 'No one wants to give me roles in movies, so I want to become a programmer', location: 'Hollywood', subjects: ['javascript', 'Angular']},
                      {student: 'Pamela Anderson', date: '09-23-2016', time: '10pm-11pm', bio: 'I wanna code with you. It will be fun', location: 'Beverly Hills',  subjects: ['javascript', 'Angular']}
                    ]
      }

    return obj;
  };

  var acceptInvitation = function(info) {
      $http.post('api/accept_invitation', info)

  };
 return {
     scheduledSessions: getScheduledSessions,
     invitations: getInvitations,
     acceptInvite: acceptInvitation
 }


})
