var app = angular.module('LivreJeu', ['ngRoute']);

// configure our routes
app.config(function($routeProvider) {
  $routeProvider
      .when('/partials', {
        templateUrl : 'story/160/1',
        controller  : 'storyController'
      });
});

// create the controller and inject Angular's $scope
app.controller('storyController', function($scope) {
  // create a message to display in our view
  $scope.message = 'Everyone come and see how good I look!';
});
