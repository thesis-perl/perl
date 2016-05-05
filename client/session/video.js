angular.module('Perl.video', ['firebase'])

.controller('video',function($scope){
  $scope.room;
  $scope.members;
  $scope.localStream

  $scope.onBistriConferenceReady = function () {

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
            bc.attachStream( stream, q( "#video_container" ), { mirror: true } );
            // then, for every single members present in the room ...
            for ( var i=0, max=members.length; i<max; i++ ) {
                // ... request a call
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
    bc.connect();
  }
});
