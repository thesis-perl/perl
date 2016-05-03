angular.module('Perl.tutorFilter', [])

.controller('tutorFilter',function($scope, tutorFactory){
	//need to send data of array of all tutors
	//need to send tutors fullname
	$scope.tutors = [];
	$scope.getAllTutors = function() {
		tutorFactory.getAllTutors()
		.then(function(data){
			$scope.tutors[0] = data.data;
			console.log('tutors', $scope.tutors)
		});
	}

	$scope.getAllTutors();
})