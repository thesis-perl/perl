angular.module('Perl.landing', [
	"moment-picker"
])
.controller("landing", function($scope, $state){
  $scope.redirectSignin = function(){
	$state.go('signin');
  }
  
  $scope.redirectSignup = function(){
	$state.go('signup');
  }
})