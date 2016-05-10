angular.module('Perl.tutorProfile', [
    "ngMaterial",
    "ngAnimate",
    "ngAria",
    "ngMessages",
    "mdPickers"])

.controller('tutorProfile', ['$scope', '$mdpDatePicker', '$mdpTimePicker', '$stateParams', '$location', 'studentFactory', '$state', '$mdToast',function($scope, $mdpDatePicker, $mdpTimePicker, $stateParams, $location, studentFactory, $state, $mdToast){
  //stores status between student and this tutor
  $scope.studentTutorStatus = "";
  //hides start session button
  $scope.hidden = true;

  var tutorInfo = {
    tutorId: parseInt($stateParams.id)
  }
  $scope.userinfo = JSON.parse(localStorage.getItem('userinfo'));

  //renders tutor's information
  studentFactory.getTutorInfo(tutorInfo, $scope.userinfo.id).then(function(data){
    var tutor = data.data;

    $scope.name = tutor.fullname;
    $scope.bio = tutor.bio;
    $scope.loc = tutor.location;
    $scope.img = tutor.imgurl;
    $scope.studentTutorStatus = tutor.status; //status between student and tutor

    if($scope.studentTutorStatus === 1){
      $mdToast.show(
         $mdToast.simple()
            .textContent('You already invited the tutor! Please wait for them to respond.')
            .hideDelay(5000)
      );
    //request session disabled
    $scope.isDisabledRequest = true;

    }else if ($scope.studentTutorStatus === 2){
      //show start session button
      $scope.hidden = false;
      //disable request session button
      $scope.isDisabledRequest = true;
    }//otherwise, request session button is simply shown
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

  $scope.requestSession = function(){
    var studentId = JSON.parse(localStorage.getItem('userinfo')).id;

    var dateTime = $scope.currentDate.toString();
    var date = dateTime.split("").slice(0,15).join(""); //ex. Mon May 02 2016
    var time = dateTime.split("").slice(16,21).join(""); //15:22
    var sessionInfo = {
      date: date,
      time: time
    }

    studentFactory.postInvite(studentId,tutorInfo.tutorId, date, time).then(function(data){
        $state.go('studentDashboard');
    }).catch(function(error){console.log('error',error)});

  };
}]);
