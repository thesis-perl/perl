angular.module('Perl.authentication', ['ngMaterial', 'firebase'])

.controller('authentication',  function($scope, authFactory, $state, $rootScope, $mdDialog, $mdMedia, $firebaseAuth){
  AWS.config.update({accessKeyId: accessKeyId, secretAccessKey: secretAccessKey});
  AWS.config.region = 'us-east-1';
  var bucket = new AWS.S3({params: {Bucket: 'perlproject'}});
  $scope.ref = new Firebase("https://perl-thesis.firebaseio.com/");

  //helper to convert subject checked status to 1 and unchecked status to 0
  $scope.subjectChecked = function(check) {
    if(check === true) {
      return 1;
    }

    else if(check === undefined || check === false) {
      return 0;
    }
  };

  $scope.userChecked = function(check) {
    if(check === true) {
      return 1;
    }
    if(check===undefined || check===false) {
      return 0;
    }
  }

    // signup helper
  $scope.signupUser = function(info) {
    authFactory.signup(info).then(function(data){
      console.log("signup user receiving this data: ", data);
      if(data.data===false) {
        $scope.userexists = 'The username "' + $scope.username + '" is taken, please sign up with another one.'
      }
      else {
      localStorage.setItem('userinfo', JSON.stringify(data.data));
      $scope.ref.authWithCustomToken(data.data.token, function(error, authData) {
        if(data.data.isStudent === 1) {
          $state.go('studentDashboard');
          $scope.hide();
        }
        else if (data.data.isTutor === 1){
         $state.go('tutorDashboard');
         $scope.hide();
        }
      })
    }
    });
  };

  //upload profile pic
  $scope.uploadFile = function(){
    var file = $scope.myFile;
    var prefix = Date.now()
    if(file) {
      var params = {Key: prefix+file.name, ContentType: file.type, Body: file};
        bucket.upload(params, function(err, data) {
          if(err)  console.log(err)
          //data.key is the photo file name
          $scope.signup(data.Location);
        });
    } else {
      $scope.signup('https://s3.amazonaws.com/perlproject/default.jpg');
    }
  };

  //signup
  $scope.signup = function(image) {
    var userInfo = {
      tutor: $scope.userChecked($scope.tutorCheckBox),
      student: $scope.userChecked($scope.studentCheckBox),
      username: $scope.username,
      password: $scope.password,
      fullname: $scope.fullname,
      location: $scope.location,
      bio: $scope.bio,
      imgurl: image,
      javascript: $scope.subjectChecked($scope.javascriptCheckbox),
      ruby: $scope.subjectChecked($scope.rubyCheckbox),
      python: $scope.subjectChecked($scope.pythonCheckbox)

    };

  //handling case when both student and tutor boxes are checked
    if($scope.studentCheckBox === true && $scope.tutorCheckBox === true) {
      $scope.signuperror = 'You can only sign up either as a student or a tuitor.';
    }
    //handling case when neither of student and tutor boxes is checked
    else if($scope.userChecked($scope.studentCheckBox) === 0 && $scope.userChecked($scope.tutorCheckBox) ===0) {
      $scope.signuperror = 'Please select if you are a tuitor or a student.';
    }
    //signing up a user
    else if($scope.tutorCheckBox === true || $scope.studentCheckBox === true) {
          if($scope.subjectChecked($scope.javascriptCheckbox) === 0 && $scope.subjectChecked($scope.rubyCheckbox) === 0 && $scope.subjectChecked($scope.pythonCheckbox) === 0) {
            $scope.signuperror= 'Please select at least one subject.';
          }
          else if($scope.username===undefined || $scope.fullname===undefined || $scope.password===undefined || $scope.bio===undefined || $scope.location === undefined) {
            $scope.signuperror = 'All fields must be filled in.';
          }
          else {
           $scope.signupUser(userInfo);
          }
    }
 };

   //sign in as user (tutor or student)
  $scope.signin = function()  {
    var userInfo = {
      username: $scope.signinUsername,
      password: $scope.signinPassword
    };
    $scope.signinUser(userInfo);
  };

  $scope.cancel = function () {
    $state.go('landing');
  };

   //user signin helper
  $scope.signinUser = function(info) {
    authFactory.signin(info).then(function(data) {
      if(data.data === 'no user with this username') {
        $scope.signinerror = 'There is no user with "' + $scope.signinUsername + '" username.';
      }
      else if(data.data === 'password doesn\'t match') {
        $scope.signinerror = 'The password doesn\'t match the username.';
      }
      else {
       localStorage.setItem('userinfo', JSON.stringify(data.data));
       $scope.ref.authWithCustomToken(data.data.token, function(error, authData) {
        if(data.data.isStudent === 1) {
           $state.go('studentDashboard');
           $scope.hide();
        }
        else if (data.data.isTutor === 1) {
            $state.go('tutorDashboard');
             $scope.hide();
        }
      });
    }
    });
  };
 
 //make signin and a signup a box popping up on the landing page
  $scope.status = '  ';
  $scope.customFullscreen = $mdMedia('ls') || $mdMedia('sm');

  $scope.showsignup= function(ev) {
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $mdDialog.show({
      controller: 'authentication',
      templateUrl: '../auth/signup.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: useFullScreen
     });
  }

  $scope.showsignin= function(ev) {
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $mdDialog.show({
      controller: 'authentication',
      templateUrl: '../auth/signin.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: useFullScreen
    })
   }

   $scope.hide  = function() {
    $mdDialog.hide();
 }


}) // end of authcontroller



.directive('fileModel', ['$parse', function ($parse) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var model = $parse(attrs.fileModel);
      var modelSetter = model.assign;

      element.bind('change', function(){
        scope.$apply(function(){
          modelSetter(scope, element[0].files[0]);
        });
      });
    }
  };
}]);
