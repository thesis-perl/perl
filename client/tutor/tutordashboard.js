angular.module('Perl.tutorDashboard', [])
.config(function(){

})
.run(function(tutorFactory, $rootScope){
    //using dummy data to test
    var scheduledData = tutorFactory.scheduledSessions();
    
    $rootScope.sessions = scheduledData.sessions;

    //using dummy data to test
    var invitationList = tutorFactory.invitations();
    $rootScope.invitations = invitationList.invitations;
})

.controller('tutorDashboard',function($scope, tutorFactory, $rootScope){
  $scope.acceptInvitation = function(){
     //id1 is going to be the current tutor's id stored in localStorage, this.id is the id of rejected student
    //tutorFactory.acceptInvite(id1, this.id);
    console.log(this.item.id);
   
    
  };
  $scope.rejectInvitation = function(){
    //id1 is going to be the current tutor's id stored in localStorage, this.id is the id of rejected student
    tutorFactory.rejectInvitation(id1, this.id)
  	console.log('invitation rejected');
    console.log(this.item)
  }
  $scope.startSession = function() {
    console.log('starting session');
  }

  $scope.cancelSession = function() {
  	console.log('canceled Sesssion')
  }



})



