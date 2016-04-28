angular.module('Perl.authentication', [])

.controller('authentication',function($scope, authFactory){
     
     console.log('helloo');

   //signup a user
  $scope.signup = function() {
  	
    var userInfo = {
   	  username: $scope.username,
      password: $scope.password,
      location: $scope.location,
      bio: $scope.bio,
      javascript: $scope.subjectChecked($scope.javascriptCheckbox),
      ruby: $scope.subjectChecked($scope.rubyCheckbox),
      python: $scope.subjectChecked($scope.pythonCheckbox)
   };
  console.log(userInfo)
    //signin up as a tutor
    if($scope.tutorCheckBox===true && $scope.studentCheckBox === undefined) {
       if($scope.javascriptCheckbox===undefined &&  $scope.rubyCheckbox ===undefined && $scope.pythonCheckbox===undefined){
          $scope.signuperr3 = 'please select at least one subject';
       }
       else {
         console.log('singning up as a tutor')
         $scope.signupTutor(userInfo);
       }
    }
	//signing up as a student 
    else if($scope.studentCheckBox===true && $scope.tutorCheckBox===undefined) {
       if($scope.javascriptCheckbox===undefined &&  $scope.rubyCheckbox ===undefined && $scope.pythonCheckbox===undefined){
          $scope.signuperr3 = 'please select at least one subject';
       } 
       else {
    	  console.log('singning up as a student');
    	  $scope.signupStudent(userInfo);
       }
    }
    //handling case when both student and tutor boxes are checked
    else if($scope.studentCheckBox===true && $scope.tutorCheckBox === true) {
    	console.log('err, both student and tutor boxes checked')
      $scope.signuperr1 = 'you can only sign up either as a student or a tuitor';
    
    } 
    //handling case when neither of student and tutor boxes is checked
    else if($scope.studentCheckBox===undefined && $scope.tutorCheckBox===undefined) {
    	console.log('err, nor student neither tutor boxes checked')
      $scope.signuperr2= 'please select if you are a tuitor or a student';
    } 
   };
   

   //tutor signup helper
  $scope.signupTutor = function(info) {
    authFactory.studentSignup(info);

  };
  //student signup helper
  $scope.signupStudent = function(info) {
   authFactory.tutorSignup(info);
  };
   
  //helper to convert subject checked status to 1 and unchecked status to 0 
  $scope.subjectChecked = function(check) {
    if(check===true) {
      return 1;
    }
    else if(check===undefined) {
      return 0;
    }
  }; 



}) // end of authcontroller

