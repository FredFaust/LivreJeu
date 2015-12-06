angular.module('LivreJeu.controllers').controller('homeController', function($scope, $http, $location) {
  console.log('homeController created');

  $scope.updateNavBar('home');

});