angular.module('LivreJeu.controllers').controller('storyController', function($scope, $http, $timeout, $location) {
  console.log('storyController created');

  $scope.prompt = {
    showCustom: false,
    showBackpack: false,
    showSpecialObjects: false
  };

  $scope.info = {
    player: $scope.$parent.player,
    progression: $scope.$parent.progression
  };

  $scope.itemsTableArray = [];
  $scope.specialObjectsTableArray = [];

  $scope.showCustomPrompt = function() {
    $scope.prompt.showCustom = true;
  };
  $scope.showBackpackPrompt = function() {
    //Here we create a copy of the player's current items. We will then construct an array that will contain arrays
    //that each contain 3 individual items. Max inventory space is 8 so there will be two rowArray containing 3 items
    //and one containing 2 items
    //This is for formatting needs only
    $scope.itemsTableArray = [];
    for(var i = 0; i < 3; i++) {
      var rowArray = [];

      for(var j = 0; j < 3; j++) {
        var index = i*3 + j;
        if (index < 8) {
          var item = {
            key: 'EMPTY',
            name: 'Vide',
            src: '/images/backpack-empty.png'
          };

          if (index < $scope.info.progression.items.length) {
            item.key = $scope.info.progression.items[index];
            item.name = $scope.$parent.items[item.key];
            item.src = $scope.$parent.itemsFiles[item.key];
          }

          rowArray.push(item);
        }
      }
      $scope.itemsTableArray.push(rowArray);
    }
    $scope.prompt.showBackpack = true;
  };
  $scope.showSpecialObjectsPrompt = function() {
    $scope.specialObjectsTableArray = [];
    for(var i = 0; i < 2; i++) {
      var rowArray = [];

      for(var j = 0; j < 3; j++) {
        var index = i*3 + j;
          var item = {
            key: 'EMPTY',
            name: 'Vide',
            src: '/images/backpack-empty.png'
          };

          if (index < $scope.info.progression.specialObjects.length) {
            item.key = $scope.info.progression.specialObjects[index];
            item.name = $scope.$parent.specialObjects[item.key];
            item.src = $scope.$parent.specialObjectsFiles[item.key];
          }

          rowArray.push(item);
      }
      $scope.specialObjectsTableArray.push(rowArray);
    }
    $scope.prompt.showSpecialObjects = true;
  };

  $scope.hideCustomPrompt = function() {
    $scope.prompt.showCustom = false;
  };
  $scope.hideBackpackPrompt = function() {
    $scope.prompt.showBackpack = false;
  };
  $scope.hideSpecialObjectsPrompt = function() {
    $scope.prompt.showSpecialObjects = false;
  };

  $scope.goToPage = function(page, section){
    $scope.prompt.show = false;
    $scope.prompt.showBackpack = false;
    $scope.prompt.showSpecialObjects = false;

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