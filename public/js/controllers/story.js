angular.module('LivreJeu.controllers').controller('storyController', function($scope, $http, $timeout, $location) {
  console.log('storyController created');

  /************************** SCOPE DEFINITION  *************************************/
  $scope.help = {
    combatInfo: '',
    enduranceInfo: ''
  };
  $scope.fights = [];

  $scope.itemsTableArray = [];
  $scope.specialObjectsTableArray = [];

  $scope.updateNavBar('story');

  /************************** TOOLTIP INFO  *************************************/

  $scope.updateCombatInfo = function() {
    console.log('update CI');
    var text = 'Initial ('  + $scope.info.player.combatSkill + ') ';

    if (_.contains($scope.info.player.disciplines, 'ARMS_CONTROL') &&
        $scope.info.player.masteredWeapon &&
        _.contains($scope.info.progression.items, $scope.info.player.masteredWeapon)) {
      text += '+ Arme maitrisee (2) ';
    }

    text += '= Total (' + $scope.info.progression.combatSkill + ')';

    $scope.help.combatInfo = text;
  };

  $scope.updateEnduranceInfo = function() {
    console.log('update EI');
    var text = 'Initial ('  + $scope.info.player.endurance + ') ';

    if (_.contains($scope.info.progression.specialObjects, 'QUILTED_LEATHER_VEST')) {
      text += '+ Veste de cuir matelasse (2) ';
    }

    text += '= Total (' + $scope.info.progression.endurance + ')';

    $scope.help.enduranceInfo = text;
  };

  /************************** PROMPT/MODAL FUNCTIONS  *************************************/
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
            item.name = $scope.context.items[item.key];
            item.src = $scope.context.itemsFiles[item.key];
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
            item.name = $scope.context.specialObjects[item.key];
            item.src = $scope.context.specialObjectsFiles[item.key];
          }

          rowArray.push(item);
      }
      $scope.specialObjectsTableArray.push(rowArray);
    }
    $scope.prompt.showSpecialObjects = true;
  };

  $scope.hideBackpackPrompt = function() {
    $scope.prompt.showBackpack = false;
  };
  $scope.hideSpecialObjectsPrompt = function() {
    $scope.prompt.showSpecialObjects = false;
  };

  /******************************* RANDOM CHOICE FROM SERVER ************************************/
  $scope.getRandomPageServer = function(page) {
    $http({
      method: "GET",
      url: "/api/randomchoice/" + page + '/' + $scope.info.progression.playerId
    }).success(function(data) {
      if (!data) {
        return;
      } else if (!data.err && data.resultPage) {
        $scope.info.progression.random = { landingPage: page, resultPage: data.resultPage };
        $scope.handleEvent(page);
      } else if (data.err){
        alert(data.err);
      }
    });
  };


  /************************** SORT FIGHTS FROM PROGRESSION  *************************************/
  //TODO: DO WE WANT TO SHOW THE LAST FIGHT AS THE FIRST ELEMENT OF OUR ORDERED LIST ??
  $scope.fights = _.sortBy($scope.info.progression.fights, 'id').reverse();

});