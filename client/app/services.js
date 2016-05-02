angular.module('Perl.services', [])
.factory('authFactory', function($http){
  //user signup request
  var id;

  var postSignupUser = function(userInfo) {
    console.log(userInfo)
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
    id: id,
    signin: postSigninUser,
    signup: postSignupUser
    // uploadFileToUrl: uploadFileToUrl
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
    //return $http.post('api/tutor_dashboard/accepted');

    //testing with dummy data
    var obj = {
      sessions: [{id: 2, student: 'Ani Steffanie', date: '06-13-2016', time: '8pm-9pm', bio: 'I am journalist aiming to learn programming', location: 'North Hollywood', subjects: ['javascript', 'Angular']}, 
                 {id: 1, student: 'Celine Dion', date: '09-23-2016', time: '6pm-8pm', bio: 'I left my signing career and want to be an engineer', location: 'Las Vegas',  subjects: ['javascript', 'Angular']} 
                ]};

    return obj;
  };

  var getInvitations = function() {
    //return $http.post('api/tutor_dashboard/invited');

    //testing with dummy data
      var obj = {

       invitations: [{student: 'Tom Hanks', date: '08-02-2016', time: '8pm-9pm', bio: 'No one wants to give me roles in movies, so I want to become a programmer', location: 'Hollywood', subjects: ['javascript', 'Angular']},
                      {student: 'Pamela Anderson', date: '09-23-2016', time: '10pm-11pm', bio: 'I wanna code with you. It will be fun', location: 'Beverly Hills',  subjects: ['javascript', 'Angular']}
                    ]}

    return obj;
  };

  var acceptInvitation = function(id1, id2) {

    var ids = {
      userId: id1,
      acceptedId: id2
    };
    $http.post('api/accept_invitation', info)
  };

  var rejectInvitation = function(id1, id2) {
    var ids = {
      usersId: id1,
      rejectedId: id2
    };
    $http.post('api/reject_invitation', ids);
  };

  
 return {
     scheduledSessions: getScheduledSessions,
     invitations: getInvitations,
     acceptInvite: acceptInvitation, 
     rejectInvite: rejectInvitation
 }


})
