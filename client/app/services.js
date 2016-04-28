angular.module('Perl.services', [])
.factory('authFactory', function($http){

   //signin
//  var postSignin = function(username, password) {
//    var user = {
//    	 username: username,
//    	 password: password
//    };
//    $http.post('/signin', user);
// };

  //signup request for student user
 var postSignupStudent = function(userInfo){
    return $http.post('/api/student_signup', userInfo);
};

 //signup request for tutor user
 var postSignupTutor = function(userInfo){
    $http.post('/api/tutor_signup', userInfo);
};


return {
 	//signin: postSignin,
 	studentSignup: postSignupStudent,
 	tutorSignup: postSignupTutor 
 };


});


