angular.module('LivreJeu.controllers').controller('createController', function($scope, $http, $timeout, $location) {
  console.log('createController was created');
  /********************* SCOPE DEFINITION ****************************************/
  $scope.canSubmit = false;
  $scope.submitSent = false;
  $scope.deleteSent = false;
  $scope.loadingPlayers = true;
  $scope.disciplines = $scope.$parent.disciplines;
  $scope.items = $scope.$parent.items;
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

  $scope.$parent.updateNavBar('story');

  /********************* MASTERED WEAPON ****************************************/
  $scope.toggleMasteredWeapon = function() {
    if (!$scope.masteredWeapon.key && !$scope.masteredWeapon.value) {
      var randomWeaponIndex = Math.floor(Math.random() * (9 - 1)) + 1;

      $http({
        method: "GET",
        url: "/gameinfo/master"
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
    url: "/players"
  }).success(function(data) {
    $scope.loadingPlayers = false;
    if (!_.isUndefined(data) && !_.isNull(data)) {
      //Updates the model whenever possible
      $timeout(function () {
        $scope.players = data.players;
        _.each($scope.players, function(p) {
          p.deleteSent = false;
        });
        console.log($scope.players);
      }, 0);
    }
  });

  /********************* PLAYER ACTIONS ****************************************/
  $scope.deletePlayer = function(player) {
    player.deleteSent = true;
    $http({
      method: "DELETE",
      url: "/players/" + player._id
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
      url: "/progressions/" + player._id
    }).success(function(data) {
      if (data.page) {
        $scope.$parent.player = player;
        $scope.$parent.progression = data;
        $location.path('/story/' + data.page);
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

      //Requ�te ajax POST pour envoyer les infos du joueur en JSON
      $http({
            method: "POST",
            url: "/players",
            data: data
          }
      ).success(function(data) {
          if (data && data.redirect) {
            $scope.$parent.player = data.player;
            $scope.$parent.progression = data.progression;

            //On redirige l'utilisateur vers le nom de la page qui � �t� renvoy� par le service web
            $location.path(data.redirect);
          }
      });

      $scope.submitSent = true;
    }
  };
});