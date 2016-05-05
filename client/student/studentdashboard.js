angular.module('Perl.studentDashboard', ['ngMaterial', 'ngMdIcons', 'firebase', 'ngMessages', 'material.svgAssetsCache'])

.controller('studentDashboard',function($mdMedia, $mdDialog, $scope, $state, $rootScope, studentFactory, authFactory){
	$scope.invitedTutors;
  $scope.userinfo = JSON.parse(localStorage.getItem('userinfo'));

  // Chat popup Modal
  $scope.status = '  ';
  $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');

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

  console.log('userinfo', $scope.userinfo);

  $scope.getInvitedTutors = function() {
  	console.log('inside get Tutorinfo id', $scope.userinfo.id);
  	studentFactory.getInvitedTutors($scope.userinfo.id)
  	.then(function(data){
  		console.log('tutors', data.data)
  		$scope.invitedTutors = data.data;
  		//need to send null instead of "no invited tutor" when there is no tutor.
  		// $scope.tutors = null;
  	})
  }

  $scope.getAcceptedTutors = function() {
  	studentFactory.getAcceptedTutors($scope.userinfo.id)
  	.then(function(data){
  		$scope.acceptedTutors = data.data;
  	})
  }

  $scope.findTutors = function() {
  	$state.go('tutorFilter');
  }

  $scope.viewProfile = function(id) {
  	$state.go('/tutorProfile/:id')
  }

  $scope.cancelInvitation = function(id) {
  	//make cancel in services
  	studentFactory.cancelInvitation($scope.userinfo.id, id);

  	$state.reload();
  }


  $scope.cancelSession = function(id) {
    studentFactory.cancelSession($scope.userinfo.id, id);

    $state.reload();
  }

  $scope.getTutorId = function(tid) {
    studentFactory.getTutorId(tid);
  }

  $scope.showChat = function(id) {
    $state.go('chat');
  }


  $scope.getInvitedTutors();
  $scope.getAcceptedTutors();

})
