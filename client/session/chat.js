angular.module('Perl.chat', ['firebase'])

.controller('chat', function($firebase,$rootScope,$scope, $firebaseArray, $firebaseAuth, $firebaseObject){
  $scope.newChat = new Firebase($rootScope.ref + "chat/test&test");
  $scope.messages = new $firebaseArray($scope.newChat);

  console.log($scope.messages);
  $scope.newMessage = function(event) {
    if(event.keyCode === 13 && $scope.msg) {
      var username = "brandon";
      console.log("chat message sent: ", $scope.msg)
      $scope.messages.$add({from: username, body: $scope.msg});
      $scope.msg = "";
    }
  }
})
