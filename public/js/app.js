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
      .when('/help', {
        templateUrl : 'partials/help',
        controller  : 'helpController'
      }).
      otherwise({
        redirectTo: '/home'
      });

  $locationProvider.html5Mode(true);
});