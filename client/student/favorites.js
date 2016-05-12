angular.module('Perl.favorites', [])

.controller('favorites',function($scope, tutorFactory){
	$scope.userinfo = JSON.parse(localStorage.getItem('userinfo'));
	$scope.favorites;

	$scope.getFavorites = function(){
		tutorFactory.getFavorites($scope.userinfo.id)
		.then(function(data) {
			$scope.favorites = data.data 
		});
	}

	$scope.getFavorites();
});

