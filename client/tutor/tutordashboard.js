angular.module('Perl.tutorDashboard', ['ngMaterial', 'ngMdIcons', 'firebase', 'ngMessages', 'material.svgAssetsCache'])
.config(function(){

})
.run(function(tutorFactory, $rootScope){

})


.controller('tutorDashboard',function($scope, tutorFactory, $rootScope, authFactory, $state, $mdDialog, $mdMedia){


  $scope.userinfo = JSON.parse(localStorage.getItem('userinfo'));

  // Chat popup Modal
  $scope.status = '  ';
  $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');

  $scope.invitedStudents;
  $scope.acceptedStudents;
  $scope.cancelledStudents;
  $scope.finishedStudents;


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

  var currentObject = localStorage.getItem("userinfo");
  var currentUserId = JSON.parse(currentObject).id

  //tutor accepts student's invitation
  $scope.acceptInvitation = function(){
    tutorFactory.acceptInvite(currentUserId, this.item.id);
    $state.reload();
  };

  //tutor rejects student's invitation
  $scope.rejectInvitation = function(){
    tutorFactory.reject(currentUserId, this.item.id)
    $state.reload();
  };

 
  //tutor cancels session
  $scope.cancelSession = function() {
   tutorFactory.cancelSession(currentUserId, this.item.id)
   console.log('tutor', currentUserId);
    console.log('student', this.item.id);
    $state.reload();
  };

  $scope.getStudentId = function(sid) {
    tutorFactory.getStudentId(sid);
  }

  $scope.showChat = function(id) {
    $state.go('chat');
  }

  $scope.getInvitedStudents = function(id) {
    console.log($scope.userinfo.id);
    tutorFactory.getInvitedStudents($scope.userinfo.id)
    .then(function(data) {
      console.log('invited data', data);
      $scope.invitedStudents = data.data;
      console.log('invitedStudents', $scope.invitedStudents);
    })
  };

  $scope.getAcceptedStudents = function(id) {
    tutorFactory.getAcceptedStudents($scope.userinfo.id)
    .then(function(data) {
      console.log('accepted data', data);
      $scope.acceptedStudents = data.data;
    })
  };

  $scope.getCancelledStudents = function(id) {
    tutorFactory.getCancelledStudents($scope.userinfo.id)
    .then(function(data) {
      console.log('cancelled data', data);
      $scope.cancelledStudents = data.data;
    })
  };

  $scope.getFinishedStudents = function(id) {
    tutorFactory.getFinishedStudents($scope.userinfo.id)
    .then(function(data) {
      console.log('finished data', data);
      $scope.finishedStudents = data.data;
    })
  };


  $scope.getInvitedStudents();
  $scope.getAcceptedStudents();
  $scope.getCancelledStudents();
  $scope.getFinishedStudents();

})// end of tutordashboard controller