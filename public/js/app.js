angular.module('LivreJeu', [
  'ngRoute',
  'LivreJeu.controllers'
]).
config(function($routeProvider, $locationProvider) {
  $routeProvider
      .when('/home', {
        templateUrl : 'partials/home',
        controller  : 'homeController'
      })
      .when('/create', {
        templateUrl : 'partials/create',
        controller  : 'createController'
      })
      .when('/story/:pageid/:sectionid', {
        templateUrl: function(params) {
          console.log(params.sectionid);
          return 'partials/story/' + params.pageid + '/' + params.sectionid;
        },
        controller  : 'createController'
      })
      .when('/help', {
        templateUrl : 'partials/help/main',
        controller  : 'helpController'
      }).
      when('/help/:topic', {
        templateUrl: function(params) {
          return 'partials/help/' + params.topic;
        },
        controller  : 'helpController'
      }).
      otherwise({
        redirectTo: '/home'
      });

  $locationProvider.html5Mode(true);
});