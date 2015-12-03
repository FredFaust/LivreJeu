angular.module('LivreJeu.controllers', []).controller('createController', function($scope, $http, $q, $window) {

  var self = this;

  $scope.user = {
    disciplinesStatus : {},
    itemsStatus : {},
    name: ''
  };

  $scope.disciplines = {
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
  };

  self.nbSelectedDisciplines = 0;
  self.nbSelectedItems = 0;

  $scope.canSubmit = false;

  self.updateSubmit = function() {
    var customCountBy = function(object) {
      return (_.countBy(object, function(name, bool) {
        return bool ? 'checked': 'unchecked';
      })).checked;
    };
    var discs = customCountBy($scope.user.disciplinesStatus),
        items = customCountBy($scope.user.itemsStatus);

    $scope.canSubmit = discs === 5 && items === 2 && $scope.user.name;
  };

  $scope.validateDisciplines = function(disciplineIsChecked) {
    self.nbSelectedDisciplines = disciplineIsChecked
        ? self.nbSelectedDisciplines + 1
        : self.nbSelectedDisciplines - 1;

    self.updateSubmit();
  };

  $scope.validateItems = function(itemIsChecked) {
    self.nbSelectedItems = itemIsChecked
        ? self.nbSelectedItems + 1
        : self.nbSelectedItems - 1;

    self.updateSubmit();
  };

  console.log('create ctrl defined');
});