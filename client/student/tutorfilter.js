angular.module('Perl.tutorFilter', [])

.controller('tutorFilter',function($scope, tutorFactory, $mdMedia, $mdDialog){

	var user = JSON.parse(localStorage.getItem('userinfo'));
	$scope.selectedItem;
	$scope.language;
	$scope.tutors = [];
	$scope.userinfo = user;

	//need to send data of array of all tutors
	//need to send tutors fullname
	$scope.getAllTutors = function() {
		tutorFactory.getAllTutors($scope.userinfo.id)
		.then(function(data){
			$scope.tutors = data.data;

			for (var i=0; i<$scope.tutors.length; i++) {
				if($scope.tutors[i].javascript === 1) {
					$scope.tutors[i].javascript = 'javascript';
				}

				if($scope.tutors[i].ruby === 1) {
					$scope.tutors[i].ruby = 'ruby';
				}

				if($scope.tutors[i].python === 1) {
					$scope.tutors[i].python = 'python';
				}
			}
		});

	}

	$scope.addFavorite = function(tid) {
		tutorFactory.addFavorite(user.id, tid);
	}

	$scope.deleteFavorite = function(tid) {
		tutorFactory.deleteFavorite(user.id, tid);
	}

	$scope.showAdvanced = function(ev) {
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;

    $mdDialog.show({
      controller: 'chat',
      templateUrl: '../session/chat.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: useFullScreen
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });

    $scope.$watch(function() {
      return $mdMedia('xs') || $mdMedia('sm');
    }, function(wantsFullScreen) {
      $scope.customFullscreen = (wantsFullScreen === true);
    });

  };

  $scope.getTutorId = function(tid) {
    studentFactory.getTutorId(tid);
  }

	$scope.getAllTutors();
})
