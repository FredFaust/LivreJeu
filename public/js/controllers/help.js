angular.module('LivreJeu.controllers').controller('helpController', function($scope, $http, $location) {
  console.log('helpController created');

  $scope.$parent.updateNavBar('help');

  //TODO: TODO lol
  //$scope.goToCreate = function() {
  //  $location.path('/create');
  //};
});