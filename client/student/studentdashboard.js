angular.module('Perl.studentDashboard', ['ngMaterial', 'ngMdIcons', 'firebase', 'ngMessages', 'material.svgAssetsCache'])

.controller('studentDashboard',function($mdMedia, $mdDialog, $scope, $state, $rootScope, studentFactory, authFactory, tutorFactory){
	$scope.invitedTutors;
  $scope.acceptedTutors;
  $scope.cancelledTutors;
  $scope.finishedTutors;
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


  $scope.getInvitedTutors = function() {
  	console.log('inside get Tutorinfo id', $scope.userinfo.id);
  	studentFactory.getInvitedTutors($scope.userinfo.id)
  	.then(function(data){
  		$scope.invitedTutors = data.data;
  	})
  }

  $scope.getAcceptedTutors = function() {
  	studentFactory.getAcceptedTutors($scope.userinfo.id)
  	.then(function(data){
  		$scope.acceptedTutors = data.data;
  	})
  }

  $scope.getCancelledTutors = function() {
    studentFactory.getCancelledTutors($scope.userinfo.id)
    .then(function(data) {
      $scope.cancelledTutors = data.data;
    })
  }

  $scope.getFinishedTutors = function() {
    studentFactory.getFinishedTutors($scope.userinfo.id)
    .then(function(data) {
      $scope.finishedTutors = data.data;
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

  $scope.addFavorite = function(tid) {
    tutorFactory.addFavorite($scope.userinfo.id, tid);
  }

  $scope.deleteFavorite = function(tid) {
    tutorFactory.deleteFavorite($scope.userinfo.id, tid);
  }

  $scope.getInvitedTutors();
  $scope.getAcceptedTutors();
  $scope.getCancelledTutors();
  $scope.getFinishedTutors();
})
