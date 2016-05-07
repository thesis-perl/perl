angular.module('Perl.tutorFilter', [])

.controller('tutorFilter',function($scope, tutorFactory, studentFactory){

	$scope.selectedItem;
	$scope.language;
	$scope.tutors = [];
	var user = JSON.parse(localStorage.getItem('userinfo'));



	//need to send data of array of all tutors
	//need to send tutors fullname
	$scope.getAllTutors = function() {
		tutorFactory.getAllTutors()
		.then(function(data){
			$scope.tutors = data.data;
			console.log('tutors', $scope.tutors)
		});
	}

	$scope.findTutorsByLanguage = function(language) {
		//make http call
		tutorFactory.findTutorsByLanguage(language)
		.then(function(data){
			$scope.tutors = data.data;
		});
	}

	$scope.addFavorite = function(tid) {
		console.log('tid', tid)
		tutorFactory.addFavorite(user.id, tid);
	}

	$scope.deleteFavorite = function(tid) {
		tutorFactory.deleteFavorite(user.id, tid);
	}

	$scope.getAllTutors();
})
