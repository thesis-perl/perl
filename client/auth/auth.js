angular.module('Perl.authentication', ['ngMaterial', 'firebase'])

.controller('authentication', ['$scope','authFactory', '$state', '$firebaseAuth', function($scope, authFactory, $state, $rootScope, $firebaseAuth){
  AWS.config.update({accessKeyId: accessKeyId, secretAccessKey: secretAccessKey});
  AWS.config.region = 'us-east-1';
  var bucket = new AWS.S3({params: {Bucket: 'perlproject'}});

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
      localStorage.setItem('userinfo', JSON.stringify(data.data));
      console.log($scope.ref);
      $scope.ref.authWithCustomToken(data.data.token, function(error, authData) {
        if(data.data.isStudent === 1) {
          $state.go('studentDashboard');
        }
        else if (data.data.isTutor === 1){
          $state.go('tutorDashboard');
        }
      })
    });
  };

  //upload profile pic
  $scope.uploadFile = function(){
    console.log('in uploadFile');
    var file = $scope.myFile;
    // if($scope.myFile === undefined) {
    //   $scope.signuperr = 'please provide a photo';
    // }
    // else {
    var prefix = Date.now()
    //console.log('in uploadFile file is', file)
      if(file) {
        var params = {Key: prefix+file.name, ContentType: file.type, Body: file};
          bucket.upload(params, function(err, data) {
            if(err)  console.log(err)
             console.log('data', data)
            //data.key is the photo file name
            $scope.signup(data.Location);
          });
      }
    // }
  };

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
      console.log('userinfo', userInfo)


    //handling case when both student and tutor boxes are checked
    if($scope.studentCheckBox === true && $scope.tutorCheckBox === true) {
          console.log('err, both student and tutor boxes checked')
          $scope.signuperror = 'you can only sign up either as a student or a tuitor';

    }
    //handling case when neither of student and tutor boxes is checked
    else if($scope.userChecked($scope.studentCheckBox) === 0 && $scope.userChecked($scope.tutorCheckBox) ===0) {
      console.log('err, nor student neither tutor boxes checked')
      $scope.signuperror = 'please select if you are a tuitor or a student';

    }

    //signing up a user
    else if($scope.tutorCheckBox === true || $scope.studentCheckBox === true) {
          if($scope.subjectChecked($scope.javascriptCheckbox) === 0 && $scope.subjectChecked($scope.rubyCheckbox) === 0 && $scope.subjectChecked($scope.pythonCheckbox) === 0) {
              $scope.signuperror= 'please select at least one subject';
              console.log('no language selected');
          }
          else if($scope.username===undefined || $scope.fullname===undefined || $scope.password===undefined || $scope.bio===undefined || $scope.location === undefined) {
              $scope.signuperror = 'all fields must be filled in';
               console.log('fields empty')
          }
          else {

            console.log(' signing up a user', userInfo);
            $scope.signupUser(userInfo);

          }
    }

  };

  $scope.signin = function()  {
   //sign in as user (tutor or student)
    var userInfo = {
      username: $scope.signinUsername,
      password: $scope.signinPassword
    };
    $scope.signinUser(userInfo);
  }



  //user signin helper
  $scope.signinUser = function(info) {
    authFactory.signin(info).then(function(data) {
      localStorage.setItem('userinfo', JSON.stringify(data.data));
      // console.log("in signin authFactoryid", authFactory.id);
      console.log($scope.ref);
      $scope.ref.authWithCustomToken(data.data.token, function(error, authData) {
        if(data.data.isStudent === 1) {
          $state.go('studentDashboard');
        }
        else if (data.data.isTutor === 1) {
          $state.go('tutorDashboard');
        }
      })
    });
  }



}]) // end of authcontroller


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
