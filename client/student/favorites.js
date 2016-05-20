angular.module('Perl.favorites', [])

.controller('favorites',function($scope, tutorFactory, $state){
	$scope.userinfo = JSON.parse(localStorage.getItem('userinfo'));
	$scope.favorites;

	$scope.getFavorites = function(){
		tutorFactory.getFavorites($scope.userinfo.id)
		.then(function(data) {
			$scope.favorites = data.data 
		});
	}

	$scope.addFavorite = function(tid) {
		tutorFactory.addFavorite($scope.userinfo.id, tid);
		$state.reload();
	}

	$scope.deleteFavorite = function(tid) {
		tutorFactory.deleteFavorite($scope.userinfo.id, tid);
		$state.reload();
	}

	$scope.getFavorites();
});

