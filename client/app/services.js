angular.module('Perl.services', ['btford.socket-io'])
.factory('authFactory', function($http){
  //user signup request

  var postSignupUser = function(userInfo) {
    return $http.post('/api/signup', userInfo);
  };

  //user sigin request
  var postSigninUser = function (userInfo) {
    return $http.post('/api/signin', userInfo);
  };

  return {
    signin: postSigninUser,
    signup: postSignupUser
  };

})


.factory('studentFactory', function($rootScope, $http) {
  var getTutorId = function(tid) {
    $rootScope.tid = tid;
  }


  var inviteTutor = function (sid, tid) {
    return $http.post('/api/invite_tutor', { 'sid': sid, 'tid': tid })
  }

  var getAllStatusTutors = function(id) {
    return $http.get('/api/student_dashboard/', { headers: { 'id': id } });
  };

  var getAcceptedTutors = function(id) {
    return $http.get('/api/student_dashboard/accepted', { headers: { 'id': id } });
  }

  var getCancelledTutors = function(id) {
    return $http.get('/api/student_dashboard/cancelled', { headers: { 'id': id } });
  }

  var getFinishedTutors = function(id) {
    return $http.get('/api/student_dashboard/finished', { headers: { 'id': id } });
  }

  var getTutorInfo = function (tutorInfo, sid) {
    console.log('inside getInfo',tutorInfo);
    return $http.get('/api/filter_tutor/info',{ headers: { 'tid': tutorInfo.tutorId, 'sid': sid }});
  };

  var cancelInvitation = function (sid, tid) {
    return $http.delete('/api/reject_invite', { headers: { 'sid': sid, 'tid': tid }});
  }

  var cancelSession = function (sid, tid) {
    return $http.put('/api/cancel_session', { 'sid': sid, 'tid': tid })
  }

  var postInvite = function (sid, tid) {
    console.log(sid,tid);
    return $http.post('/api/invite_tutor', { 'sid': sid, 'tid': tid });
  }

  return {
    getTutorId: getTutorId,
    getAllStatusTutors: getAllStatusTutors,
    getAcceptedTutors: getAcceptedTutors,
    getCancelledTutors: getCancelledTutors,
    getFinishedTutors: getFinishedTutors,
    getTutorInfo: getTutorInfo,
    cancelInvitation: cancelInvitation,
    cancelSession: cancelSession,
    postInvite: postInvite
  }

})
.factory('tutorFactory', function($http, $rootScope){
  //zoe put it here to search all tutors
  var getStudentId = function(sid) {
    $rootScope.sid = sid;
    console.log("tutorfactory sid:",$rootScope.sid);
  }

  var getAllTutors = function(sid) {
    return $http.get('/api/filter_tutor', { headers: {'sid': sid}})
  }


  var findTutorsByLanguage = function(language) {
    //make a http call
    // return $http.get()
  }

  var getInvitedStudents = function(id) {
    return $http.get('/api/tutor_dashboard/invited', { headers: {'id': id }});

  };

  var getAcceptedStudents = function(id) {
    return $http.get('/api/tutor_dashboard/accepted',  { headers: {'id': id }});
  };

  var getCancelledStudents = function(id) {
    return $http.get('/api/tutor_dashboard/cancelled', { headers: { 'id': id } });
  }

  var getFinishedStudents = function(id) {
    return $http.get('/api/tutor_dashboard/finished', { headers: { 'id': id } });
  }


  var acceptInvitation = function(tutorId, studentId) {
    var ids = {
      tid: tutorId,
      sid: studentId
    };
    $http.put('api/accept_student', ids)

  };

  var rejectInvitation = function(tutorId, studentId) {
    var ids = {
      tid: tutorId,
      sid: studentId
    };
    $http.put('api/reject_invite', ids);
  };

  var startSession = function(code){

    //return $http.get('/startsession', {headers: {'code': code}})

  };

  var cancelSession = function(tutorId, studentId) {
    $http.put('/api/cancel_session', {'tid': tutorId, 'sid': studentId});
  };

  var addFavorite = function(sid, tid) {
    return $http.post('/api/fav_tutor', {'tid': tid, 'sid': sid});
  }

  var deleteFavorite = function(sid, tid) {
    return $http.put('/api/unfavorite', {'tid': tid, 'sid': sid});
  }


  return {
    getStudentId: getStudentId,
    getAllTutors: getAllTutors,
    getInvitedStudents: getInvitedStudents,
    getAcceptedStudents: getAcceptedStudents,
    getCancelledStudents: getCancelledStudents,
    getFinishedStudents: getFinishedStudents,
    acceptInvite: acceptInvitation,
    reject: rejectInvitation,
    cancelSession: cancelSession,
    findTutorsByLanguage: findTutorsByLanguage,
    startSession: startSession,
    addFavorite: addFavorite,
    deleteFavorite: deleteFavorite,
  }
})

.factory('perlSocket', function(socketFactory) {
  var socket = socketFactory();
  socket.forward('broadcast');
  socket.forward('joined');
  socket.forward('typing');
  socket.forward('untyping');

  return socket;
})
.factory('sessionFactory', function($http) {
  //saving session/lesson code in database
  var saveCodeDB = function(tutorId, studentId, code){
    var sessionInfo = {
      tid: tutorId,
      sid: studentId,
      code: code
    };

    console.log('getting code info', sessionInfo)
    $http.post('save_code', sessionInfo);
  };

  var endSession = function(sid, tid) {
    console.log('in service endSession')
    return $http.put('/api/end_seesion', {'tid': tid, 'sid': sid});
  }

  var room;
  var members;
  var localStream

  var onBistriConferenceReady = function () {
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

        for ( var i=0; i<1; i++ ) {
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

    bc.connect();

  }

  // when button "Join Conference Room" has been clicked
  var joinConference = function (){
    var roomToJoin = "28";
    // if "Conference Name" field is not empty ...
    if( roomToJoin ){
      // ... join the room;
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

  return {
    saveCodeDB: saveCodeDB,
    endSession: endSession,
    loadVideo: onBistriConferenceReady,
    joinConference: joinConference,
    quitConference: quitConference,
    showPanel: showPanel,
    q: q
  }
})
