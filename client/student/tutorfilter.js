angular.module('Perl.tutorFilter', [])

.controller('tutorFilter',function($scope, tutorFactory, studentFactory){

	$scope.selectedItem;
	$scope.language;
	$scope.tutors = [];
	var user = JSON.parse(localStorage.getItem('userinfo'));



	//need to send data of array of all tutors
	//need to send tutors fullname
	$scope.getAllTutors = function() {
		tutorFactory.getAllTutors(user.id)
		.then(function(data){

			console.log('tutors', data.data)
			$scope.tutors = data.data;

			for (var i=0; i<$scope.tutors.length; i++) {
				if($scope.tutors[i].javascript === 1) {
					$scope.tutors[i].javascript = 'javascript'
				}

				if($scope.tutors[i].ruby === 1) {
					$scope.tutors[i].ruby = 'ruby'
				}

				if($scope.tutors[i].python === 1) {
					$scope.tutors[i].python = 'python'
				}
			}
		});

	}

	$scope.addFavorite = function(tid) {
		tutorFactory.addFavorite(user.id, tid);
	}

	$scope.deleteFavorite = function(tid) {
		console.log('tid', tid)
		tutorFactory.deleteFavorite(user.id, tid);
	}

	$scope.getAllTutors();
})
