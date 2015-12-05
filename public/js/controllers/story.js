angular.module('LivreJeu.controllers').controller('storyController', function($scope, $http, $timeout, $location) {
  console.log('storyController created');

  $scope.info = {
    player: $scope.$parent.player,
    progression: $scope.$parent.progression
  };

  $scope.goToPage = function(page, section){
    $scope.$parent.progression.page = parseInt(page, 10);
    var data = _.omit($scope.$parent.progression, '_id');

    var progressionId = $scope.$parent.progression.playerId;
    $http({
      method: 'PUT',
      url: '/progressions/' + progressionId,
      data: data
    }).success(function(data) {
      var s = section || '1';
      $location.path('/story/' + page + '/' + s);
    });
  };
});