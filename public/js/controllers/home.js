angular.module('LivreJeu.controllers').controller('homeController', function($scope, $http, $location) {
  console.log('homeController created');

  $scope.$parent.updateNavBar('home');

  $scope.goToCreate = function() {
    $location.path('/create');
  };
});