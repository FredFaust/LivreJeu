angular.module('LivreJeu.controllers').controller('playerController', function($scope, $http, $timeout) {
  console.log('PlayerController created');
  $scope.player = {};
  $scope.progression = {};
  $scope.disciplines = {};
  $scope.items = {};
  $scope.itemsFiles = {};

  $http({
    method: "GET",
    url: "/gameinfo/all"
  }).success(function(data) {
    if (!_.isUndefined(data) && !_.isNull(data)) {
      var deserializedData = JSON.parse(data);

      //Updates the model whenever possible
      $timeout(function () {
        $scope.disciplines = deserializedData.DISCIPLINES;
        $scope.items = deserializedData.ITEMS;
        $scope.itemsFiles = deserializedData.ITEMS_FILES;
      }, 0);
    }
  });
});