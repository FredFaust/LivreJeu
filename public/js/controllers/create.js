angular.module('LivreJeu.controllers').controller('createController', function($scope, $http, $q, $window, $timeout) {

  /********************* SCOPE DEFINITION ****************************************/
  $scope.canSubmit = false;
  $scope.submitSent = false;
  $scope.disciplines = {};
  $scope.items = {};
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
    url: "/gameinfo/all"
  }).success(function(data) {
    if (!_.isUndefined(data) && !_.isNull(data)) {
      var deserializedData = JSON.parse(data);

      //Updates the model whenever possible
      $timeout(function () {
        $scope.disciplines = deserializedData.DISCIPLINES;
        $scope.items = deserializedData.ITEMS;
      }, 0);
    }
  });

  $http({
    method: "GET",
    url: "/players"
  }).success(function(data) {
    if (!_.isUndefined(data) && !_.isNull(data)) {
      console.log(data);

      //Updates the model whenever possible
      $timeout(function () {
        $scope.players = data.players;
      }, 0);
    }
  });

  /********************* PLAYER ACTIONS ****************************************/
  $scope.deletePlayer = function(id) {
    $http({
      method: "DELETE",
      url: "/players/" + id
    }).success(function(data) {
        //Filter our the deleted player
        $timeout(function () {
          $scope.players = $scope.players.filter(function(p) {
            return p._id != id;
          });
        }, 0);
    });
  };

  $scope.continueStory = function(id) {
    $http({
      method: "GET",
      url: "/progressions/" + id
    }).success(function(data) {
      if (data.page) {
        window.location = '/story/' + data.page;
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
            url: "/players",
            data: data
          }
      ).success(function(data) {
          if (data && typeof(data.redirect) == 'string') {
            //On redirige l'utilisateur vers le nom de la page qui à été renvoyé par le service web
            window.location = data.redirect;
          }
      });

      $scope.submitSent = true;
    }
  };
});