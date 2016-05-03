angular.module('Perl.studentDashboard', ['ngMaterial', 'ngMdIcons'])

.controller('studentDashboard',function($mdMedia, $scope, $state, studentFactory, authFactory){

  $scope.userinfo = JSON.parse(localStorage.getItem('userinfo'));
  console.log('userinfo', $scope.userinfo);

  $scope.getTutorInfo = function() {
  	studentFactory.getTutorInfo($scope.userinfo.id);
  }

  $scope.findTutors = function() {
  	$state.go('tutorFilter')
  }


})