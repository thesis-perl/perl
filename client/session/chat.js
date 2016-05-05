angular.module('Perl.chat', ['firebase'])

.controller('chat', function($firebase,$rootScope,$scope, $firebaseArray, $firebaseAuth, $firebaseObject, studentFactory){
  $scope.userinfo = JSON.parse(localStorage.getItem('userinfo'));
  $scope.otherId = $rootScope.tid;
  $scope.newChat = new Firebase($rootScope.ref + "chat/" + $scope.userinfo.id + "&" + $scope.otherId);
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
