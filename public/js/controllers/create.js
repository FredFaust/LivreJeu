angular.module('LivreJeu.controllers').controller('createController', function($scope, $http, $timeout, $location) {
  console.log('createController was created');
  /********************* SCOPE DEFINITION ****************************************/
  $scope.canSubmit = false;
  $scope.submitSent = false;
  $scope.deleteSent = false;
  $scope.loadingPlayers = true;
  $scope.masteredWeapon = {
    key : null,
    value : null
  };
  $scope.user = {
    disciplinesStatus : {},
    itemsStatus : {},
    name: ''
  };
  $scope.players = [];

  $scope.updateNavBar('story');

  /********************* MASTERED WEAPON ****************************************/
  $scope.toggleMasteredWeapon = function() {
    if (!$scope.masteredWeapon.key && !$scope.masteredWeapon.value) {
      var randomWeaponIndex = Math.floor(Math.random() * (9 - 1)) + 1;

      $http({
        method: "GET",
        url: "/api/gameinfo/master"
      }).success(function(data) {
        if (!data) {
          return;
        }

        $timeout(function () {
          var weapons = _.pairs(JSON.parse(data));
          $scope.masteredWeapon.key = weapons[randomWeaponIndex][0];
          $scope.masteredWeapon.value = weapons[randomWeaponIndex][1];
        }, 0);
      });
    } else {
      $scope.masteredWeapon = { key: null, value: null };
    }
  };

  /********************* HTTP REQUESTS ****************************************/
  $http({
    method: "GET",
    url: "/api/players"
  }).success(function(data) {
    $scope.loadingPlayers = false;
    if (!_.isUndefined(data) && !_.isNull(data)) {
      //Updates the model whenever possible
      $timeout(function () {
        $scope.players = data.players;
        _.each($scope.players, function(p) {
          p.deleteSent = false;
        });
      }, 0);
    }
  });

  /********************* PLAYER ACTIONS ****************************************/
  $scope.deletePlayer = function(player) {
    player.deleteSent = true;
    $http({
      method: "DELETE",
      url: "/api/players/" + player._id
    }).success(function(data) {
        //Filter our the deleted player
        $timeout(function () {
          $scope.players = $scope.players.filter(function(p) {
            return p._id != player._id;
          });
        }, 0);
    });
  };

  $scope.continueStory = function(player) {
    $http({
      method: "GET",
      url: "/api/progressions/" + player._id
    }).success(function(data) {
      if (data.page) {
        $scope.info.player = player;
        $scope.info.progression = data;

        var pageToHandle = _.findWhere($scope.pages, {id : data.page });

        $location.path('/story/' + data.page);

        if (pageToHandle && pageToHandle.actionOnLoad){
          pageToHandle.actionOnLoad();
        }
      }
    });
  };

  /********************* FORM SUBMIT ****************************************/
  $scope.updateSubmit = function() {
    var customCountBy = function(object) {
      return (_.countBy(object, function(value) {
        return value ? 'checked': 'unchecked';
      })).checked;
    };
    var discs = customCountBy($scope.user.disciplinesStatus),
        items = customCountBy($scope.user.itemsStatus);

    $scope.canSubmit = discs === 5 && items === 2 && $scope.user.name;
  };

  $scope.formSubmit = function() {
    //action='/player' was removed from the jade because the form was always submitted
    // now that it is removed, only this function will be called and we can decide to ajax on /players or not
    if ($scope.canSubmit) {
      var disciplines = [],
          items = [];

      var keepSelectedCheckboxes = function(input, output) {
        _.map(input, function(value, key) {
          if (value) {
            output.push(key);
          }
        });
      };

      keepSelectedCheckboxes($scope.user.disciplinesStatus, disciplines);
      keepSelectedCheckboxes($scope.user.itemsStatus, items);

      var data = {
        name: $scope.user.name,
        disciplines: disciplines,
        items: items
      };

      if ($scope.masteredWeapon.key) {
        data.masteredWeapon = $scope.masteredWeapon.key;
      }

      //Requête ajax POST pour envoyer les infos du joueur en JSON
      $http({
            method: "POST",
            url: "/api/players",
            data: data
          }
      ).success(function(data) {
          if (data && data.redirect) {
            $scope.info.player = data.player;
            $scope.info.progression = data.progression;

            if (data.redirect === '/create') {
              $location.path(data.redirect);
            } else {
              var pageToHandle = _.findWhere($scope.pages, {id : 1 });

              $location.path('/story/1');

              if (pageToHandle && pageToHandle.actionOnLoad){
                pageToHandle.actionOnLoad();
              }
            }
          }
      });

      $scope.submitSent = true;
    }
  };
});