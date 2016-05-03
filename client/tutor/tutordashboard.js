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

.controller('tutorDashboard',function($scope, tutorFactory, $rootScope, authFactory){
  var currentObject = localStorage.getItem("userInfo");
  console.log('tutor', JSON.parse(currentObject))
  var currentUserId = JSON.parse(currentObject).id

  //tutor accepts student's invitation
  $scope.acceptInvitation = function(){
    console.log('tutorId', currentUserId)
    console.log('studentId', this.item.id)
    tutorFactory.acceptInvite(currentUserId, this.item.id);
  };

  //tutor rejects student's invitation
  $scope.rejectInvitation = function(){};
  
  //tutor starts session
   $scope.startSession = function() {};
  
  //tutor calcels session
  $scope.cancelSession = function() {};



})// end of tutordashboard controller



