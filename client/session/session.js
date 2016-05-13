angular.module('Perl.session', ['btford.socket-io', 'ui.codemirror', 'ngMaterial', 'material.svgAssetsCache' , 'ngMessages'])

.controller('session',function($log, $scope, perlSocket, $stateParams, $state, $rootScope, sessionFactory, $mdToast, $firebaseArray, $firebaseAuth, $firebaseObject){
    var typing = false;


	var user = JSON.parse(localStorage.getItem('userinfo'));
	$scope.user = user;
	var link;
    if(user.isTutor === 0) {
		link = user.id + "/" + $stateParams.link;
	} else {
		link = $stateParams.link + "/" + user.id;
	}


	perlSocket.emit('join', {link: link, name: user.fullname});

	$scope.change = function() {
		perlSocket.emit('code changed', $scope.sharedCode);
	}

	$scope.$on('socket:broadcast', function(event, data) {
		console.log('in broadcast', data)
		$scope.sharedCode = data;
	});

	$scope.$on('socket:joined', function(event, data) {
		$scope.hint = data + " just joined the session!";
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
			var typingTimer = (new Date()).getTime();
			var timeDiff = typingTimer - lastTypingTime;
			if (timeDiff >= 400 && typing) {
				perlSocket.emit('untyping');
				typing = false;
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
		$mdToast.show(
			$mdToast.simple()
			.textContent($scope.hint)
			.position('righttop')
			.hideDelay(2500)
		);
	};

  // $scope.userinfo = JSON.parse(localStorage.getItem('userinfo'));
  // console.log("this is my userinfo:", $scope.user);
  $scope.studentId;
  $scope.tutorId;

  if ($scope.user.isStudent === 1) {
    $scope.studentId = $scope.user.id;
    $scope.tutorId = $rootScope.tid;
  } else if ($scope.user.isTutor === 1) {
    $scope.studentId = $rootScope.sid;
    $scope.tutorId = $scope.user.id;
  }
  $scope.studentTutor = $scope.studentId + "-" + $scope.tutorId;

	$scope.loadVideo = function() {
		sessionFactory.loadVideo($scope.studentTutor);
	};

	//Chatroom
	$scope.newChat = new Firebase($rootScope.ref + "chat/" + $scope.studentId + "&" + $scope.tutorId);
	$scope.messages = new $firebaseArray($scope.newChat);

	$scope.newMessage = function(event) {
		if(event.keyCode === 13 && $scope.msg) {
			var username = user.fullname;
			$scope.messages.$add({from: username, body: $scope.msg});
			$scope.msg = "";
		}
	}

});
