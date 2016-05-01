angular.module('Perl.tutorDashboard', [])
.config(function(){

})
.run(function(tutorFactory, $rootScope){
    //using dummy data to test
    var scheduledData = tutorFactory.scheduledSessions()
    console.log(scheduledData.invitations)
    $rootScope.sessions = scheduledData.sessions

    //using dummy data to test
    var invitationList = tutorFactory.invitations();
    $rootScope.invitations = invitationList.invitations;
})

.controller('tutorDashboard',function($scope, tutorFactory){
  $scope.acceptInvitation = function(){
    tutorFactory.acceptInvite();
  };
  $scope.rejectInvitation = function(){
  	console.log('invitation rejected');
  }
  $scope.startSession = function() {
    console.log('starting session');
  }

  $scope.cancelSession = function() {
  	console.log('canceled Sesssion')
  }



})



