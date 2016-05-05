angular.module('Perl', ['Perl.config', 'Perl.authentication', 'Perl.services', 'Perl.session', 'Perl.studentDashboard', 'Perl.tutorFilter', 'Perl.tutorProfile', 'Perl.tutorDashboard', 'Perl.landing', 'ui.router', 'ngMaterial', 'firebase', 'btford.socket-io', 'ui.codemirror'])

.run(function ($state, $firebase,$rootScope,$location,$window,$firebase,$firebaseAuth) {
  //instances and constants to be injected here
  $rootScope.ref = new Firebase("https://perl-thesis.firebaseio.com/");
  $rootScope.authObj = $firebaseAuth($rootScope.ref);
  $rootScope.checkAuthentication = function() {
    $rootScope.authObj.$onAuth(function(authData) {
      console.log('authdata', authData);
      if(authData) {
        console.log("we have auth data yay :", authData);
      } else {
        // event.preventDefault();
        $state.go('signin');
      }
    })
  }
  $rootScope.$on("$stateChangeStart", function(event, toState, toParams) {
    var requireLogin = toState.authenticate;
    if(requireLogin) {
      $rootScope.checkAuthentication();
    }
    // event.preventDefault();
  })
  $rootScope.signOutUser = function() {
    $rootScope.ref.unauth();
		$state.go('signin');
	}
})

.config(function ($stateProvider, $urlRouterProvider, $mdThemingProvider) {
  $stateProvider

  .state('landing', {
    cache: false,
    url: '/',
    templateUrl: '../landing/landing.html',
    controller: 'landing',
    authenticate: false
  })

  .state('signup', {
    cache: false,
    url: '/signup',
    templateUrl: '../auth/signup.html',
    controller: 'authentication',
    authenticate: false
  })

  .state('signin', {
    cache: false,
    url: '/signin',
    templateUrl: '../auth/signin.html',
    controller: 'authentication',
    authenticate: false
  })

  .state('session', {
    cache: false,
    url: '/session',
    templateUrl: '../session/session.html',
    controller: 'session',
    authenticate: true
  })

  .state('studentDashboard', {
    cache: false,
    url: '/studentDashboard',
    templateUrl: '../student/studentDashboard.html',
    controller: 'studentDashboard',
    authenticate: true
  })

  .state('tutorFilter', {
    cache: false,
    url: '/tutorFilter',
    templateUrl: '../student/tutorFilter.html',
    controller: 'tutorFilter',
    authenticate: true
  })

  .state('tutorProfile', {
    cache: false,
    url: '/tutorProfile/:id',
    templateUrl: '../student/tutorProfile.html',
    controller: 'tutorProfile',
    authenticate: true
  })

  .state('tutorDashboard', {
    cache: false,
    url: '/tutorDashboard',
    templateUrl: '../tutor/tutorDashboard.html',
    controller: 'tutorDashboard',
    authenticate: true
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');

  $mdThemingProvider.theme('default')
  .primaryPalette('blue-grey')
  .accentPalette('orange');
});
