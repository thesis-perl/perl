describe('signup module', function () {

  beforeEach(module('Perl.authentication'));

  beforeEach(angular.mock.module({
  	'authentication': {
  		 	getAllTutors: function() {
  		 	return new Promise(function(resolve, reject) {
  		 		return { data: [{id: 2, fullname: "Tom Jackson"}, {id: 276, fullname: "Stephanie Jones"}] };
  		 	});
  		 }
  	}
  }));
  var $controller;

  beforeEach(inject(function(_$controller_){
    $controller = _$controller_;
  }));

  describe('getAllTutors', function() {
  	it('should get all tutors information', function() {
  		var $scope = {};
  		var controller = $controller('tutorFilter', {$scope: $scope});
  		$scope.getAllTutors();
  		console.log('totor', $scope.tutors)
  		expect($scope.tutors).not.toBe(undefined);
  	});

  });

});