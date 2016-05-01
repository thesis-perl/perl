angular.module('Perl.studentDashboard', ['ngMaterial', 'ngMdIcons'])

.controller('studentDashboard',function($mdMedia, $scope, studentFactory){
	$scope.studentName;
	$scope.studentLocation;
	$scope.studentBio;

	// $scope.getStudentProfile = function() {
	// 	studentFactory.getProfile()
	// 	.then(function(data){
	// 		$scope.studentName = data.studentName;
	// 		$scope.studentLocaiton = data.studentLocaiton;
	// 		$scope.studentBio = data.studentBio;
	// 	});
	// }

	// $scope.getStudentProfile();
})