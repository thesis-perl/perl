angular.module('Perl.tutorFilter', [])

.controller('tutorFilter',function($scope){
	$scope.tutors;
	$scope.getAllTutors = function() {
		studentFactory.getAllTutors();
	}
})