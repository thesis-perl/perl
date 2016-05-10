angular.module('Perl.tutorProfile', [
    "ngMaterial",
    "ngAnimate",
    "ngAria",
    "ngMessages",
    "mdPickers"])

.controller('tutorProfile', ['$scope', '$mdpDatePicker', '$mdpTimePicker', '$stateParams', '$location', 'studentFactory', '$state',function($scope, $mdpDatePicker, $mdpTimePicker, $stateParams, $location, studentFactory, $state){

  var tutorInfo = {
    tutorId: parseInt($stateParams.id)
  }
  $scope.userinfo = JSON.parse(localStorage.getItem('userinfo'));

  console.log("my tutorId: ", tutorInfo.tutorId)

  studentFactory.getTutorInfo(tutorInfo, $scope.userinfo.id).then(function(data){
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

  $scope.requestSession = function(time, date){
    // console.log('timedate', time, date);
    var studentInfo = JSON.parse(localStorage.getItem('userinfo')).id;

    var apptDate = $scope.currentDate.toString();
    var apptTime = $scope.currentTime.toString();

    var date = moment(apptDate.split("").slice(0,15).join("")).format('YYYY-MM-DD'); //ex. Mon May 02 2016
    var time = apptTime.split("").slice(16,21).join(""); //15:22

    console.log('date, time', date, time);

    var sessionInfo = {
      date: date,
      time: time
    }

    if(!studentInfo){
      console.log('student not signed in')
    }
    //LATER FOR WHEN FLAG INVITED IN DB


    studentFactory.postInvite(studentInfo, tutorInfo.tutorId, time, date).then(function(data){
      console.log('Session requested, data received',data);
      $state.go('studentDashboard');
    }).catch(function(error){console.log('error',error)});
  };

}]);
