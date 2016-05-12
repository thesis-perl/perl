angular.module('Perl.chat', ['firebase'])

.controller('chat', function($firebase,$rootScope,$scope, $firebaseArray, $firebaseAuth, $firebaseObject, studentFactory){
  $scope.userinfo = JSON.parse(localStorage.getItem('userinfo'));
  $scope.studentId;
  $scope.tutorId;

  if ($scope.userinfo.isStudent === 1) {
    $scope.studentId = $scope.userinfo.id;
    $scope.tutorId = $rootScope.tid;
  } else if ($scope.userinfo.isTutor === 1) {
    $scope.studentId = $rootScope.sid;
    $scope.tutorId = $scope.userinfo.id;
  }
  $rootScope.studentTutor = $scope.studentId + "&" + $scope.tutorId;

  $scope.newChat = new Firebase($rootScope.ref + "chat/" + $rootScope.studentTutor);
  $scope.messages = new $firebaseArray($scope.newChat);

  $scope.newMessage = function(event) {
    if(event.keyCode === 13 && $scope.msg) {
      var userName = $scope.userinfo.fullname;
      $scope.messages.$add({from: userName, body: $scope.msg});
      $scope.msg = "";
    }
  }
})
