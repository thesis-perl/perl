angular.module('Perl.tutorDashboard', [])
.config(function(){

})
.run(function(tutorFactory, $rootScope){
})

.controller('tutorDashboard',function($scope, tutorFactory, $rootScope, authFactory, $state){

  var userId = JSON.parse(localStorage.getItem('userinfo')).id;


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
  $scope.startSession = function() {};

  //tutor calcels session
  $scope.cancelSession = function() {
   tutorFactory.cancelSession(currentUserId, this.item.id)
   console.log('tutor', currentUserId);
    console.log('student', this.item.id);
    $state.reload();
  };



})// end of tutordashboard controller
