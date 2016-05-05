angular.module('Perl.tutorDashboard', ['ngMaterial', 'ngMdIcons', 'firebase', 'ngMessages', 'material.svgAssetsCache'])
.config(function(){

})
.run(function(tutorFactory, $rootScope){
})

.controller('tutorDashboard',function($scope, tutorFactory, $rootScope, authFactory, $state, $mdDialog, $mdMedia){

  var userId = JSON.parse(localStorage.getItem('userinfo')).id;

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


  tutorFactory.invitations(userId).then(function(data){
    if(data.data.length===0) {
      $scope.noInvite = "you currently don't have any invitation"
    }
    $scope.invitations = data.data;
  });

  tutorFactory.scheduledSessions(userId).then(function(data){
   if(data.data.length===0) {
      $scope.noSession = "you currently don't have any scheduled session"
    }
    $scope.sessions = data.data;
  });

  $scope.userinfo = JSON.parse(localStorage.getItem('userinfo'));
  var currentObject = localStorage.getItem("userinfo");
  var currentUserId = JSON.parse(currentObject).id

  //tutor accepts student's invitation
  $scope.acceptInvitation = function(){
    tutorFactory.acceptInvite(currentUserId, this.item.id);
    $state.reload();
  };

  //tutor rejects student's invitation
  $scope.rejectInvitation = function(){
    //console.log("reject", currentUserId, this.item.id)
    tutorFactory.reject(currentUserId, this.item.id)
    $state.reload();
  };

  //tutor starts session
  $scope.startSession = function() {
    
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



})// end of tutordashboard controller
