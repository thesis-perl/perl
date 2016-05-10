angular.module('Perl.session', ['btford.socket-io', 'ui.codemirror', 'ngMaterial', 'material.svgAssetsCache' , 'ngMessages'])

.controller('session',function($log, $scope, perlSocket, $stateParams, $state, $rootScope, sessionFactory, $mdToast, $firebaseArray, $firebaseAuth, $firebaseObject){
	var typing = false;


	var user = JSON.parse(localStorage.getItem('userinfo'));
	var link;

	if(user.isTutor === 0) {
		link = user.id + "/" + $stateParams.link;
	} else {
		link = $stateParams.link + "/" + user.id;
	}


	perlSocket.emit('join', {link: link, name: user.fullname});

	$scope.$watch('sharedCode', function(){
		perlSocket.emit('code changed', $scope.sharedCode);
	});

	$scope.$on('socket:broadcast', function(event, data) {
		$scope.sharedCode = data;
	});

	$scope.$on('socket:joined', function(event, data) {
		$scope.hint = data + " just joined the session!";
		console.log('get hint')
		$scope.showSimpleToast();
	})

	$scope.$on('socket:typing', function(event, data) {
		$scope.typing = data + " is typing...";
	})

	$scope.$on('socket:untyping', function(event, data) {
		$scope.typing = "";
	})

	$scope.typingUpdate = function() {
		if (!typing) {
			typing = true;
			perlSocket.emit('typing', user.fullname);
		}
		var lastTypingTime = (new Date()).getTime();

		setTimeout(function () {
			console.log("setTimeout typing is ture or not:", typing)
			var typingTimer = (new Date()).getTime();
			var timeDiff = typingTimer - lastTypingTime;
			if (timeDiff >= 400 && typing) {
				perlSocket.emit('untyping');
				typing = false;
				console.log('see if it happen', $scope.typing)
			}
		}, 800);
	}

	$scope.endSession = function() {
		perlSocket.emit('endSession');

		if(user.isTutor === 0) {
			sessionFactory.endSession(user.id, $stateParams.link);
			$state.go('studentDashboard');
		} else {
			sessionFactory.endSession($stateParams.link, user.id);
			$state.go('tutorDashboard');
		}
	}

	//language options
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

	//saving the lesson code in the database
	$scope.saveCodeInDatabase = function() {
		console.log('i',  user.id)
		console.log('other', Number($stateParams.link))
		console.log(user);

		if (user.isTutor ===1) {
			sessionFactory.saveCodeDB(user.id, Number($stateParams.link), $scope.sharedCode)
		}
		else if(user.isStudent ===1) {
			sessionFactory.saveCodeDB(Number($stateParams.link), user.id, $scope.sharedCode)
		}
	};

	//donwload code on local
	$scope.downloadCode = function() {
		document.location = 'data:Application/octet-stream,' + encodeURIComponent($scope.sharedCode);
	};

	// pop up hint when a user joined.
	$scope.showSimpleToast = function() {
		console.log("in show")
		$mdToast.show(
			$mdToast.simple()
			.textContent($scope.hint)
			.position('righttop')
			.hideDelay(2500)
		);
	};

	$scope.loadVideo = function() {
		sessionFactory.loadVideo();
	};

	//Chatroom
	$scope.newChat = new Firebase($rootScope.ref + "chat/" + $rootScope.studentTutor);
	$scope.messages = new $firebaseArray($scope.newChat);

	console.log($scope.messages);
	$scope.newMessage = function(event) {
		if(event.keyCode === 13 && $scope.msg) {
			var username = $rootScope.myUsername;
			console.log("chat message sent: ", $scope.msg)
			$scope.messages.$add({from: username, body: $scope.msg});
			$scope.msg = "";
		}
	}

});
