angular.module('Perl', ['Perl.config', 'Perl.authentication', 'Perl.services', 'Perl.session',  'Perl.studentDashboard', 'Perl.tutorFilter', 'Perl.favorites', 'Perl.chat', 'Perl.video', 'Perl.tutorProfile', 'Perl.tutorDashboard', 'Perl.landing', 'ui.router', 'ngMaterial', 'firebase', 'btford.socket-io', 'ui.codemirror'])

.run(function ($state, $firebase,$rootScope,$location,$window,$firebase,$firebaseAuth) {
  //instances and constants to be injected here
  $rootScope.ref = new Firebase("https://perl-thesis.firebaseio.com/");
  $rootScope.authObj = $firebaseAuth($rootScope.ref);
  $rootScope.checkAuthentication = function() {
    $rootScope.authObj.$onAuth(function(authData) {
      // console.log('authdata', authData);
      if(authData) {
      } else {
        // event.preventDefault();
        $state.go('landing');
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
    localStorage.removeItem('userinfo');
    $state.go('landing');
	}
})

.config(function ($stateProvider, $urlRouterProvider, $mdThemingProvider, $mdDateLocaleProvider) {
  $stateProvider

  .state('landing', {
    cache: false,
    url: '/',
    templateUrl: '../landing/landing.html',
    controller: 'landing',
    authenticate: false
    // resolve: Perl.landing.resolve
  })

  // .state('signup', {
  //   cache: false,
  //   url: '/signup',
  //   templateUrl: '../auth/signup.html',
  //   controller: 'authentication',
  //   authenticate: false
  // })

  // .state('signin', {
  //   cache: false,
  //   url: '/signin',
  //   templateUrl: '../auth/signin.html',
  //   controller: 'authentication',
  //   authenticate: false
  // })

  .state('session', {
    cache: false,
    url: '/session/:link',
    templateUrl: '../session/session.html',
    controller: 'session',
    authenticate: true
  })

  .state('studentDashboard', {
    cache: false,
    url: '/studentDashboard',
    templateUrl: '../student/studentdashboard.html',
    controller: 'studentDashboard',
    authenticate: true
  })

  .state('tutorFilter', {
    cache: false,
    url: '/tutorFilter',
    templateUrl: '../student/tutorfilter.html',
    controller: 'tutorFilter',
    authenticate: true
  })

  .state('favorites', {
    cache: false,
    url: '/favorites',
    templateUrl: '../student/favorites.html',
    controller: 'favorites',
    authenticate: true
  })

  .state('tutorProfile', {
    cache: false,
    url: '/tutorProfile/:id',
    templateUrl: '../student/tutorprofile.html',
    controller: 'tutorProfile',
    authenticate: true
  })

  .state('tutorDashboard', {
    cache: false,
    url: '/tutorDashboard',
    templateUrl: '../tutor/tutordashboard.html',
    controller: 'tutorDashboard',
    authenticate: true
  })

  .state('chat', {
    cache: false,
    url: '/chat',
    templateUrl: '../session/chat.html',
    controller: 'chat',
    authenticate: true
  })

  .state('session.video', {
    cache: false,
    url:'/video',
    templateUrl: '../session/video.html',
    controller: 'video',
    authenticate: true
  })


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');

  var customPrimary = {
          '50': '#597D78',
          '100': '#597D78',
          '200': '#597D78',
          '300': '#597D78',
          '400': '#597D78',
          '500': '#597D78',
          '600': '#597D78',
          '700': '#597D78',
          '800': '#597D78',
          '900': '#597D78',
          'A100': '#597D78',
          'A200': '#597D78',
          'A400': '#597D78',
          'A700': '#597D78'
      };
      $mdThemingProvider
          .definePalette('customPrimary',
                          customPrimary);

  $mdThemingProvider.theme('default')
  .primaryPalette('customPrimary')
  .accentPalette('orange');

  $mdDateLocaleProvider.formatDate = function(date) {
    return moment(date).format('YYYY-MM-DD');
  };
});
