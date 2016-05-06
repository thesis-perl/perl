angular.module('Perl.session', ['btford.socket-io', 'ui.codemirror'])

.controller('session',function($log, $scope, perlSocket, $stateParams, $state){
	var typing = false;
	var lastTypingTime;

	var user = JSON.parse(localStorage.getItem('userinfo'));
	var link;
	if(user.isTutor === 0) {
		link = user.id + "/" + $stateParams.link;
	} else {
		link = $stateParams.link + "/" + user.id;
  }


	var name = JSON.parse(localStorage.getItem('userinfo')).fullname;
	console.log('name', link);

	perlSocket.on('connect', function(){
		perlSocket.emit('join', link);
	})

	perlSocket.on('disconnect', function(){
		console.log(name + 'disconnect')
	})

	$scope.$watch('sharedCode', function(){
		perlSocket.emit('code changed', {name: name, code: $scope.sharedCode});

		// if (!typing) {
  //     typing = true;
  //     perlSocket.emit('typing', name);
  //  	}
		// lastTypingTime = (new Date()).getTime();

		// setTimeout(function () {
		// 	console.log("setTimeout typing is ture or not:", typing)
  //      var typingTimer = (new Date()).getTime();
  //      var timeDiff = typingTimer - lastTypingTime;
  //      if (timeDiff >= 400 && typing) {
  //        perlSocket.emit('untyping');
  //        typing = false;
  //        console.log('see if it happen', $scope.typing)
  //      }
  //    }, 400);
	});

  $scope.$on('socket:broadcast', function(event, data) {
      $scope.sharedCode = data.code;
      // $scope.status = data.name + " is typing";

  });


  $scope.$on('socket:joined', function(event, data) {
  	$scope.hint = "You joined " + data;
  })

  $scope.$on('socket:typing', function(event, data) {
  	console.log('do i get typing', data)
  	$scope.typing = data + " is typing...";
  })

  $scope.$on('socket:untyping', function(event, data) {
  	console.log('untyping', data)
  	$scope.typing = "";
  })

  $scope.typingUpdate = function() {
  			if (!typing) {
  	      typing = true;
  	console.log('typingUpdate is here: ', name);
  	      perlSocket.emit('typing', name);
  	   	}
  			lastTypingTime = (new Date()).getTime();

  			setTimeout(function () {
  				console.log("setTimeout typing is ture or not:", typing)
  	       var typingTimer = (new Date()).getTime();
  	       var timeDiff = typingTimer - lastTypingTime;
  	       if (timeDiff >= 400 && typing) {
  	         perlSocket.emit('untyping');
  	         typing = false;
  	         console.log('see if it happen', $scope.typing)
  	       }
  	     }, 400);
  }

  $scope.endSession = function() {
  	console.log("test")

  	perlSocket.emit('endSession');
  	
  	if(user.isTutor === 0) {
  		$state.go('studentDashboard');
  	} else {
  		$state.go('tutorDashboard');
  	}
  }

  ///////language options
  $scope.modes = ['Javascript', 'Python', 'Ruby'];
  $scope.mode = $scope.modes[0];
  $scope.cmOption = {
     lineNumbers: true,
     indentWithTabs: true,
     onLoad : function(_cm){
       $scope.modeChanged = function(){
        _cm.setOption("mode", $scope.mode.toLowerCase());
      };
    }
  };
/////  

});




