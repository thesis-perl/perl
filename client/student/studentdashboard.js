angular.module('Perl.studentDashboard', ['ngMaterial', 'ngMdIcons'])

.controller('studentDashboard',function($mdMedia, $scope, $state, studentFactory, authFactory){
	$scope.tutors;
  $scope.userinfo = JSON.parse(localStorage.getItem('userinfo'));

  console.log('userinfo', $scope.userinfo);

  $scope.getTutorInfo = function() {
  	console.log('inside get Tutorinfo id', $scope.userinfo.id);
  	studentFactory.getTutorInfo($scope.userinfo.id)
  	.then(function(data){
  		console.log('tutors', data.data)
  		$scope.tutors = data.data;
  	})
  }

  $scope.findTutors = function() {
  	$state.go('tutorFilter')
  }

  $scope.getTutorInfo();

})