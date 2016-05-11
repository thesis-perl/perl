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
  
  console.log("my student id: ",$scope.studentId);
  console.log("my tutor id: ",$scope.tutorId);
  console.log("my studentTutor is: ", $rootScope.studentTutor)


  $scope.newChat = new Firebase($rootScope.ref + "chat/" + $rootScope.studentTutor);
  $scope.messages = new $firebaseArray($scope.newChat);

  console.log($scope.newChat);
  $scope.newMessage = function(event) {
    if(event.keyCode === 13 && $scope.msg) {
      var userName = $scope.userinfo.fullname;
      console.log("chat message sent: ", $scope.msg)
      $scope.messages.$add({from: userName, body: $scope.msg});
      $scope.msg = "";
    }
  }
})
