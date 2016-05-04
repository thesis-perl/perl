angular.module('Perl.tutorProfile', [
    "ngMaterial",
    "ngAnimate",
    "ngAria",
    "ngMessages",
    "mdPickers"])

.controller('tutorProfile', ['$scope', '$mdpDatePicker', '$mdpTimePicker', '$stateParams', '$location', 'studentFactory' ,function($scope, $mdpDatePicker, $mdpTimePicker, $stateParams, $location, studentFactory){
  $scope.userinfo = JSON.parse(localStorage.getItem('userinfo'));

  var tutorInfo = {
    tutorId: parseInt($stateParams.id)
  }

  studentFactory.getTutorInfo(tutorInfo).then(function(data){
    var tutor = data.data;

    $scope.name = tutor.fullname;
    $scope.bio = tutor.bio;
    $scope.loc = tutor.location;
    $scope.img = tutor.imgurl;
    //name, bio, location
  });

  $scope.showDatePicker = function(ev) {
    $mdpDatePicker($scope.currentDate, {
      targetEvent: ev
    }).then(function(selectedDate) {
      $scope.currentDate = selectedDate;
    });
  };

  $scope.filterDate = function(date) {
    return moment(date).date() % 2 == 0;
  };

  $scope.showTimePicker = function(ev) {
    $mdpTimePicker($scope.currentTime, {
      targetEvent: ev
    }).then(function(selectedDate) {
      $scope.currentTime = selectedDate;
    });
  };

  $scope.redirectTutorDashboard = function() {
    console.log('in redirectTutorDashboard')
    // $location.url('./studentdashboard.html');
  }


  $scope.requestSession = function(id){
    console.log($scope.userinfo);
    studentFactory.inviteTutor($scope.userinfo, id);



    // var dateTime = $scope.currentDate.toString();
    // var date = dateTime.split("").slice(0,15).join(""); //ex. Mon May 02 2016
    // var time = dateTime.split("").slice(16,21).join(""); //15:22
    // var sessionInfo = {
    //   date: date,
    //   time: time
    // }


  // if(!studentInfo.id){
  //   console.log('student not signed in')
  // }

    //LATER FOR WHEN FLAG INVITED IN DB

    // studentFactory.getTutorInfo(tutorInfo).then(function(data){
    //   console.log('Session requested, data received',data);
    // });
  };



}]);
