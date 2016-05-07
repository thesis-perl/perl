angular.module('Perl.session', ['btford.socket-io', 'ui.codemirror', 'ngMaterial'])

.controller('session',function($log, $scope, perlSocket, $stateParams, $state, sessionFactory, $mdToast){
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
			$state.go('studentDashboard');
		} else {
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
	var room;
	var members;
	var localStream

	onBistriConferenceReady = function () {
		// test if the browser is WebRTC compatible
		if ( !bc.isCompatible() ) {
			// if the browser is not compatible, display an alert
			alert( "your browser is not WebRTC compatible !" );
			// then stop the script execution
			return;
		}

		bc.init( {
			"appId": bistriAppId,
			"appKey": bistriAppKey
		});


		bc.signaling.bind( "onConnected", function () {
			// show pane with id "pane_1"
			showPanel( "pane_1" );
		});

		bc.signaling.bind( "onError", function ( error ) {
			// display an alert message
			alert( error.text + " (" + error.code + ")" );

		} );

		// when an error occured on the server side
		bc.signaling.bind( "onError", function ( error ) {
			// display an alert message
			alert( error.text + " (" + error.code + ")" );
		} );

		// when the user has joined a room
		bc.signaling.bind( "onJoinedRoom", function ( data ) {
			// set the current room name
			room = data.room;
			members = data.members;
			// ask the user to access to his webcam
			bc.startStream( "webcam-sd", function( stream ){
				// affect stream to "localStream" var
				localStream = stream;
				// when webcam access has been granted
				// show pane with id "pane_2"
				showPanel( "pane_2" );
				// insert the local webcam stream into div#video_container node
				// bc.attachStream( stream, q( "#video_container" ), { mirror: true } );
				// then, for every single members present in the room ...

				for ( var i=0, max=members.length; i<max; i++ ) {
					// ... request a call
					console.log('member', members[i]);
					bc.call( members[ i ].id, room, { "stream": stream } );
				}

			} );
		} );

		// when an error occurred while trying to join a room
		bc.signaling.bind( "onJoinRoomError", function ( error ) {
			// display an alert message
			alert( error.text + " (" + error.code + ")" );
		} );

		// when the local user has quitted the room
		bc.signaling.bind( "onQuittedRoom", function( room ) {
			// stop the local stream
			bc.stopStream( localStream, function(){
				// remove the stream from the page
				bc.detachStream( localStream );
				// show pane with id "pane_1"
				showPanel( "pane_1" );
			} );
		} );

		// when a new remote stream is received
		bc.streams.bind( "onStreamAdded", function ( remoteStream ) {
			// insert the new remote stream into div#video_container node
			bc.attachStream( remoteStream, q( "#video_container" ) );
		} );

		// when a remote stream has been stopped
		bc.streams.bind( "onStreamClosed", function ( stream ) {
			// remove the stream from the page
			bc.detachStream( stream );
		} );

		// when a local stream cannot be retrieved
		bc.streams.bind( "onStreamError", function( error ){
			switch( error.name ){
				case "PermissionDeniedError":
				alert( "Webcam access has not been allowed" );
				bc.quitRoom( room );
				break
				case "DevicesNotFoundError":
				if( confirm( "No webcam/mic found on this machine. Process call anyway ?" ) ){
					// show pane with id "pane_2"
					showPanel( "pane_2" );
					for ( var i=0, max=members.length; i<max; i++ ) {
						// ... request a call
						bc.call( members[ i ].id, room );
					}
				}
				else{
					bc.quitRoom( room );
				}
				break
			}
		} );

		// bind function "joinConference" to button "Join Conference Room"
		q( "#join" ).addEventListener( "click", joinConference );

		// bind function "quitConference" to button "Quit Conference Room"
		q( "#quit" ).addEventListener( "click", quitConference );

		// open a new session on the server
		// new Promise(function(){
		bc.connect();
		// })
		// .then(function(data) {
		//   console.log('.then');
		//   bc.joinRoom("2")
		// })
		joinConference();
	}


	// when button "Join Conference Room" has been clicked
	var joinConference = function (){
		// var roomToJoin = q( "#room_field" ).value;
		var roomToJoin = "3";
		// if "Conference Name" field is not empty ...
		if( roomToJoin ){
			// ... join the room
			console.log(bc.joinRoom);
			bc.joinRoom( roomToJoin );
		}
		else{
			// otherwise, display an alert
			alert( "you must enter a room name !" )
		}
	}

	// when button "Quit Conference Room" has been clicked
	var quitConference = function (){
		// quit the current conference room
		bc.quitRoom( room );
	}

	var showPanel = function ( id ){
		var panes = document.querySelectorAll( ".pane" );
		// for all nodes matching the query ".pane"
		for( var i=0, max=panes.length; i<max; i++ ){
			// hide all nodes except the one to show
			panes[ i ].style.display = panes[ i ].id == id ? "block" : "none";
		};
	}

	var q = function ( query ){
		// return the DOM node matching the query
		return document.querySelector( query );
	}

	onBistriConferenceReady()
	
});
