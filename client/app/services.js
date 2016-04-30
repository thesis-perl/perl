angular.module('Perl.services', [])
.factory('authFactory', function($http){
  //user signup request
  var postSignupUser = function(userInfo) {
    return $http.post('/api/user_signup', userInfo);
    console.log('signin in a user', userInfo);
  };


 //user sigin request
  var postSigninUser = function (userInfo) {
    $http.post('/api/student_login', userInfo);
  
  };
  return {
    signin: postSigninUser,
    signup: postSignupUser
  };


})

.factory('studentFactory', function($http) {
	var getProfile = function(){

	}
	return {
		getProfile: getProfile
	}

});


