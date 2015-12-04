angular.module('LivreJeu.controllers').controller('createController', function($scope, $http, $q, $window) {

  $scope.user = {
    disciplinesStatus : {},
    itemsStatus : {},
    name: ''
  };
  $scope.canSubmit = false;

  $.ajax({
    type: "GET",
    url: "/gameinfo/all",
    success: function(data) {
      if (!_.isUndefined(data) && !_.isNull(data)) {
        console.log(data);
        var deserializedData = JSON.parse(data);
        $scope.disciplines = deserializedData.DISCIPLINES;
        $scope.items = deserializedData.ITEMS;
      }
    },
    error: function(jqXHR, exception) {
      console.log('Une erreur est survenue lors du de la requete avec le serveur...');
    }
  });

  /*$scope.disciplines = {
    CAMOUFLAGE: 'Camouflage',
    HUNT: 'Chasse',
    SIXTH_SENSE: '6e sens',
    ORIENTATION: 'Orientation',
    HEALING: 'Guerison',
    ARMS_CONTROL: 'Maitrise des armes',
    PSYCHIC_SHIELD: 'Bouclier psychique',
    PSYCHIC_POWER: 'Puissance psychique',
    ANIMAL_COMMUNICATION: 'Communication animale',
    PSYCHIC_MASTER_OF_MATTER: 'Maitre psychique de la matiere'
  };

  $scope.items = {
    SWORD: 'Epee',
    SABRE: 'Sabre',
    SPEAR: 'Lance',
    MACE: 'Masse d\'armes',
    WAR_HAMMER: 'Marteau de guerre',
    AXE: 'Hache',
    STICK: 'Baton',
    GLAIVE: 'Glaive',
    QUILTED_LEATHER_VEST: 'Gilet de cuir matelasse',
    LAMPSUR_POTION: 'Potion de lampsur',
    SPECIAL_RATIONS: 'Rations speciales'
  };*/



  $scope.updateSubmit = function() {
    var customCountBy = function(object) {
      return (_.countBy(object, function(name, bool) {
        return bool ? 'checked': 'unchecked';
      })).checked;
    };
    var discs = customCountBy($scope.user.disciplinesStatus),
        items = customCountBy($scope.user.itemsStatus);

    console.log($scope.user);
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

      /*$("#discs input:checked").each(function() {
        disciplines.push(this.name);
      });
      $("#equip input:checked").each(function() {
        items.push(this.name);
      });*/

      var data = {
        name: $scope.user.name,
        disciplines: disciplines,
        items: items
      };

      //TODO: verify maitrise des armes code
      /*var masteredWeapon = localStorage.getItem('random-weapon-key');
      if (masteredWeapon) {
        data.masteredWeapon = masteredWeapon;
      }*/

      //Requête ajax POST pour envoyer les infos du joueur en JSON
      $.ajax({
        type: "POST",
        url: "/players",
        success: function(data) {
          if (typeof(data.redirect) == 'string') {
            //On redirige l'utilisateur vers le nom de la page qui à été renvoyé par le service web
            window.location = data.redirect;
          }
        },
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json"
      });

    }
  };

  console.log('create ctrl defined');
});