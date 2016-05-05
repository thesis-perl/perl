angular.module('Perl.chat', ['firebase'])

.controller('chat', function($firebase,$rootScope,$scope, $firebaseArray, $firebaseAuth, $firebaseObject, studentFactory){
  $scope.userinfo = JSON.parse(localStorage.getItem('userinfo'));
  $scope.studentId;
  $scope.tutorId;
  $scope.otherName;

  if ($scope.userinfo.isStudent === 1) {
    $scope.studentId = $scope.userinfo.id;
    $scope.tutorId = $rootScope.tid;
    $scope.otherName = $scope.userinfo.fullname;
  } else if ($scope.userinfo.isStudent === 0) {
    $scope.studentId = $rootScope.sid;
    $scope.otherId = $scope.studentId;
    $scope.otherName = $scope.userinfo.fullname;
  }
  console.log("my student id: ",$scope.studentId);
  console.log("my tutor id: ",$scope.tutorId);


  $scope.newChat = new Firebase($rootScope.ref + "chat/" + $scope.studentId + "&" + $scope.tutorId);
  $scope.messages = new $firebaseArray($scope.newChat);

  console.log($scope.messages);
  $scope.newMessage = function(event) {
    if(event.keyCode === 13 && $scope.msg) {
      var username = $scope.userinfo.fullname;
      console.log("chat message sent: ", $scope.msg)
      $scope.messages.$add({from: username, body: $scope.msg});
      $scope.msg = "";
    }
  }
})
