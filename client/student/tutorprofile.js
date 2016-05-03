angular.module('Perl.tutorProfile', [
    "ngMaterial",
    "ngAnimate",
    "ngAria",
    "ngMessages",
    "mdPickers"])

.controller('tutorProfile', ['$scope', '$mdpDatePicker', '$mdpTimePicker', '$stateParams',function($scope, $mdpDatePicker, $mdpTimePicker, $stateParams){
  $scope.showDatePicker = function(ev) {
    $mdpDatePicker($scope.currentDate, {
      targetEvent: ev
    }).then(function(selectedDate) {
      $scope.currentDate = selectedDate;
    });;
  };
  
  $scope.filterDate = function(date) {
    return moment(date).date() % 2 == 0;
  };
  
  $scope.showTimePicker = function(ev) {
    $mdpTimePicker($scope.currentTime, {
      targetEvent: ev
    }).then(function(selectedDate) {
      $scope.currentTime = selectedDate;
    });;
  };

  $scope.requestSession = function(){
    
  };  

  console.log('params', $stateParams.id)  //tutor's id
}]);


