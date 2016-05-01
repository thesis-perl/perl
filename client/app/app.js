angular.module('Perl', ['Perl.config', 'Perl.authentication', 'Perl.services', 'Perl.session', 'Perl.studentDashboard', 'Perl.tutorFilter', 'Perl.tutorProfile', 'Perl.tutorDashboard', 'Perl.landing', 'ui.router', 'ngMaterial', 'firebase'])

.run(function () {
  //instances and constants to be injected here
})

.config(function ($stateProvider, $urlRouterProvider, $mdThemingProvider) {
  $stateProvider

  .state('landing', {
    cache: false,
    url: '/',
    templateUrl: '../landing/landing.html',
    controller: 'landing'
  })

  .state('signup', {
    cache: false,
    url: '/signup',
    templateUrl: '../auth/signup.html',
    controller: 'authentication'
  })
  
  .state('signin', {
    cache: false,
    url: '/signin',
    templateUrl: '../auth/signin.html',
    controller: 'authentication'
  })

  .state('session', {
    cache: false,
    url: '/session',
    templateUrl: '../session/session.html',
    controller: 'session'
  })

  .state('studentDashboard', {
    cache: false,
    url: '/studentDashboard',
    templateUrl: '../student/studentDashboard.html',
    controller: 'studentDashboard'
  })

  .state('tutorFilter', {
    cache: false,
    url: '/tutorFilter',
    templateUrl: '../student/tutorFilter.html',
    controller: 'tutorFilter'
  })  

  .state('tutorProfile', {
    cache: false,
    url: '/tutorProfile',
    templateUrl: '../student/tutorProfile.html',
    controller: 'tutorProfile'
  }) 

  .state('tutorDashboard', {
    cache: false,
    url: '/tutorDashboard',
    templateUrl: '../tutor/tutorDashboard.html',
    controller: 'tutorDashboard'
  })   

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');

  $mdThemingProvider.theme('default')
    .primaryPalette('blue-grey')
    .accentPalette('orange');
});

