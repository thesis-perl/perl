
angular.module('Perl.authentication', ['ngMaterial', 'firebase'])

.controller('authentication', ['$scope', 'authFactory', '$state', '$firebaseAuth', function($scope, authFactory, $state, $firebaseAuth){
  AWS.config.update({accessKeyId: accessKeyId, secretAccessKey: secretAccessKey});
  AWS.config.region = 'us-east-1';
  var bucket = new AWS.S3({params: {Bucket: 'perlproject'}});

  $scope.ref = new Firebase("https://perl-thesis.firebaseio.com/");
  $scope.auth = $firebaseAuth($scope.ref);

  $scope.uploadFile = function(){
    var file = $scope.myFile;
    var prefix = Date.now()
    console.log('in uploadFile file is', file)
    if(file) {
      var params = {Key: prefix+file.name, ContentType: file.type, Body: file};
      bucket.upload(params, function(err, data) {
        if(err) console.log(err)
        console.log('data', data)
        //data.key is the photo file name
        $scope.signup(data.Location);
      });
    }
  };

  $scope.signup = function(image) {
    

   console.log('in signup')
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
    console.log("signup this user", userInfo)

    //handling case when both student and tutor boxes are checked
    if($scope.studentCheckBox === true && $scope.tutorCheckBox === true) {
      console.log('err, both student and tutor boxes checked')
      $scope.signuperr1 = 'you can only sign up either as a student or a tuitor';

    }
    //signin up a user
    else if($scope.tutorCheckBox === true || $scope.studentCheckBox === true) {
      if($scope.javascriptCheckbox === undefined && $scope.rubyCheckbox === undefined && $scope.pythonCheckbox === undefined) {
        $scope.signuperr3 = 'please select at least one subject';

      }
      else {
        console.log(' signing up a user', userInfo)
        $scope.signupUser(userInfo);
      }
    }

    //handling case when neither of student and tutor boxes is checked
    else if($scope.studentCheckBox === undefined && $scope.tutorCheckBox === undefined) {
      console.log('err, nor student neither tutor boxes checked')
      $scope.signuperr2 = 'please select if you are a tuitor or a student';

    }
  };

  $scope.signin = function()  {
    console.log('in signin');
    //sign in as user (tutor or student)
    var userInfo = {
      username: $scope.signinUsername,
      password: $scope.signinPassword
    };
    console.log('auth.js: in signin: userInfo: ', userInfo);
    $scope.signinUser(userInfo);
  }

  // signup helper
  $scope.signupUser = function(info) {
    authFactory.signup(info).then(function(data){
      console.log("signup user receiving this data: ", data);
      authFactory.id = data.data.id;
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

  //user signin helper
  $scope.signinUser = function(info) {
    authFactory.signin(info).then(function(data) {
      authFactory.id = data.data.id;
      console.log("in signin authFactoryid", authFactory.id);
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

  //helper to convert subject checked status to 1 and unchecked status to 0
  $scope.subjectChecked = function(check) {
    if(check === true) {
      return 1;
    }
    else if(check === undefined) {
      return 0;
    }
  };

  $scope.userChecked = function(check) {
    if(check === true) {
      return 1;
    }
    if(check===undefined) {
      return 0;
    }
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

