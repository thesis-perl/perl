angular.module('Perl.session', ['btford.socket-io'])

.controller('session',function($log, $scope, perlSocket){
	  $scope.messageLog = 'Ready to chat!';

	  $scope.sendMessage = function() {
	    $log.debug('sending message', $scope.message);
	    perlSocket.emit('message', $scope.message);
	    $scope.message = '';
	  };

	  $scope.$on('socket:broadcast', function(event, data) {
	    $log.debug('got a message', event.name);
	    if (!data) {
	      $log.error('invalid message', 'event', event, 'data', JSON.stringify(data));
	      return;
	    } 
	    $scope.$apply(function() {
	      $scope.messageLog = $scope.messageLog + messageFormatter(new Date(), data.source, data.payload);
	    });
	  });
})

.directive('chatBox', function() {
    return {
        restrict: 'E',
        template: '<textarea style="width: 100%; height: 200px" ng-disable="true" ng-model="messageLog"></textarea>',
        controller: function($scope, $element) {
            $scope.$watch('messageLog', function() {
              var textArea = $element[0].children[0];
              textArea.scrollTop = textArea.scrollHeight;
            });
        }
    };
});