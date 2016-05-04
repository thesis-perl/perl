angular.module('Perl.tutorFilter', [])

.controller('tutorFilter',function($scope, tutorFactory){

	$scope.selectedItem;
	$scope.language;
	$scope.tutors = [];

	//need to send data of array of all tutors
	//need to send tutors fullname
	$scope.getAllTutors = function() {
		tutorFactory.getAllTutors()
		.then(function(data){
			$scope.tutors = data.data;
			console.log('tutors', $scope.tutors)
		});
	}

	$scope.findTutorsByLanguage = function() {
		//make http call
		tutorFactory.findTutorsByLanguage($scope.language)
		.then(function(data){
			$scope.tutors = data.data;
		});
	}

	$scope.getAllTutors();
})