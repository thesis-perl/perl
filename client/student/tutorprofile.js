angular.module('Perl.tutorProfile', [
    "ngMaterial",
    "ngAnimate",
    "ngAria",
    "ngMessages",
    "mdPickers"])

.controller('tutorProfile', ['$scope', '$mdpDatePicker', '$mdpTimePicker', '$stateParams', '$location', 'studentFactory', '$state', '$mdToast', 'tutorFactory',function($scope, $mdpDatePicker, $mdpTimePicker, $stateParams, $location, studentFactory, $state, $mdToast, tutorFactory){
  //stores status between student and this tutor
  $scope.studentTutorStatus = "";
  //hides start session button
  $scope.hidden = true;
  $scope.reviews = [];

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
    $scope.javascript = tutor.javascript;
    $scope.python = tutor.python;
    $scope.ruby = tutor.ruby;
  
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
   
    if($scope.currentDate===undefined || $scope.currentTime===undefined) {
      $scope.picktime = 'Please select date and time';
    }
    else {

    var apptDate = $scope.currentDate.toString();
    var apptTime = $scope.currentTime.toString();

    var date = moment(apptDate.split("").slice(0,15).join("")).format('YYYY-MM-DD'); //ex. Mon May 02 2016
    var time = apptTime.split("").slice(16,21).join(""); //15:22

    var sessionInfo = {
      date: date,
      time: time
    }

    studentFactory.postInvite(studentId,tutorInfo.tutorId, date, time).then(function(data){
        $state.go('studentDashboard');
    }).catch(function(error){console.log('error',error)});
  }
  };

  $scope.reload = function() {
    $state.reload();
  }

  $scope.getReviews = function() {
    tutorFactory.getReviews(tutorInfo.tutorId)
    .then(function(data) {
      $scope.reviews = data.data;
    })
  }

  $scope.getReviews();    
}]);

// .directive('starRating', function() {
//       return {
//         restrict: 'EA',
//         template:
//           '<ul class="star-rating" ng-class="{readonly: readonly}">' +
//           '  <li ng-repeat="star in stars" class="star" ng-class="{filled: star.filled}" ng-click="toggle($index)">' +
//           '    <i class="fa fa-star">&#9733</i>' + // or &#9733
//           '  </li>' +
//           '</ul>',
//         scope: {
//           ratingValue: '=ngModel',
//           max: '=?', // optional (default is 5)
//           onRatingSelect: '&?',
//           readonly: '=?'
//         },
//         link: function(scope, element, attributes) {
//           if (scope.max == undefined) {
//             scope.max = 5;
//           }
//           function updateStars() {
//             scope.stars = [];
//             for (var i = 0; i < scope.max; i++) {
//               scope.stars.push({
//                 filled: i < scope.ratingValue
//               });
//             }
//           };
//           scope.toggle = function(index) {
//             if (scope.readonly == undefined || scope.readonly === false){
//               scope.ratingValue = index + 1;
//               scope.onRatingSelect({
//                 rating: index + 1
//               });
//             }
//           };
//           scope.$watch('ratingValue', function(oldValue, newValue) {
//             if (newValue) {
//               updateStars();
//             }
//           });
//         }
//       };
//     });;
