angular.module('LivreJeu.controllers').controller('storyController', function($scope, $http, $q, $window, $timeout) {
  console.log('storyController created');

  $scope.info = {
    player: $scope.$parent.player,
    progression: $scope.$parent.progression
  };
  $scope.info.progression.money = 0;



});