angular.module('Perl.session', ['btford.socket-io'])

.controller('session',function($log, $scope, perlSocket){
	$scope.needToChange = false;
	if(!$scope.needToChange) {
		$scope.$watch('sharedCode', function(){
			var name = JSON.parse(localStorage.getItem('userinfo')).fullname;
			perlSocket.emit('code changed', $scope.sharedCode);
		})
	}
  $scope.$on('socket:broadcast', function(event, data) {
    $log.debug('got a message ani', event.name, data);
      $scope.sharedCode = data;
      $scope.needToChange = true;
  });
});