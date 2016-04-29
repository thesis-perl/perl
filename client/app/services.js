angular.module('Perl.services', [])
.factory('authFactory', function($http){
  //signup request for student user
  var postSignupStudent = function(userInfo) {
    return $http.post('/api/student_signup', userInfo);
  };

  //signup request for tutor user
  var postSignupTutor = function(userInfo) {
    $http.post('/api/tutor_signup', userInfo);
  };

  var postSigninUser = function (userInfo) {
    $http.post('/api/user_signin', userInfo);
    console.log(userInfo);
  };
  return {
    signin: postSigninUser,
    studentSignup: postSignupStudent,
    tutorSignup: postSignupTutor, 
  };
});


