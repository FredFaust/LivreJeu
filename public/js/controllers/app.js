angular.module('LivreJeu.controllers').controller('appController', function($scope, $http, $location, $timeout) {
  console.log('appController created');

  $scope.nav = {
      selected:  ""
  };

  $scope.info = {
    player: {},
    progression: {}
  };

  $scope.context = {
    disciplines: {},
    items: {},
    itemsFiles: {},
    specialObjects: {},
    specialObjectsFiles: {}
  };

  $scope.updateNavBar = function(selected) {
    $scope.nav.selected = selected;
  };

  $scope.goToPage = function(link){
    var page = link;

    if (link === '/story') {
      if ($scope.info.progression.page) {
        page = '/story/' + $scope.info.progression.page;
      } else {
        page = '/create';
      }
    }

    $location.path(page);
  };

  $http({
    method: "GET",
    url: "/api/gameinfo/all"
  }).success(function(data) {
    if (!_.isUndefined(data) && !_.isNull(data)) {
      var deserializedData = JSON.parse(data);

      //Updates the model whenever possible
      $timeout(function () {
        $scope.context.disciplines = deserializedData.DISCIPLINES;
        $scope.context.items = deserializedData.ITEMS;
        $scope.context.itemsFiles = deserializedData.ITEMS_FILES;
        $scope.context.specialObjects = deserializedData.SPECIAL_ITEMS;
        $scope.context.specialObjectsFiles = deserializedData.SPECIAL_ITEMS_FILES;
      }, 0);
    }
  });
});